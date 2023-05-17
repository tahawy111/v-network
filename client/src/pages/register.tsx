"use client";
import Input from '@/components/Input';
import Layout from '@/components/Layout';
import { login } from '@/features/auth/auth';
import { startLoading, stopLoading } from '@/features/global/global';
import { AppDispatch } from '@/features/store';
import { validEmail } from '@/lib/validation';
import { IFormProps, InputChange } from '@/types/typescript';
import Head from 'next/head';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

interface LoginProps {

}

const Login: FC<LoginProps> = ({ }) => {
    interface ILoginProps {
        fullname: string;
        email: string;
        password: string;
        cf_password: string;
    }
    const dispatch: AppDispatch = useDispatch();
    const [formData, setFormData] = useState<ILoginProps>({
        fullname: "",
        email: "",
        password: "",
        cf_password: "",
    });
    const handleInputChange = ({ target }: InputChange) => {
        setFormData((v: any) => ({ ...formData, [target.name]: target.validity.valid ? target.value : v[target.name] }));
    };
    const handleSubmit = async (e: IFormProps) => {
        e.preventDefault();

        if (!formData.email || !formData.password) return toast.error("Please fill in all fields.");
        if (!validEmail(formData.email)) return toast.error("Email isn't valid.");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 chars.");
        if (formData.password !== formData.cf_password) return toast.error("Password isn't match");
        dispatch(startLoading());

        await dispatch(login({ fullname: formData.fullname, email: formData.email, password: formData.password }));

        dispatch(stopLoading());
    };
    return <Layout>
        <Head>
            <title>V-NETWORK | Login</title>
        </Head>


        <div className="flex justify-center w-full h-screen items-center">
            <div className="border-2 max-w-sm p-5">
                <h3 className="font-light text-center">V-NETWORK - Login</h3>
                <form onSubmit={ handleSubmit }>
                    <Input placeholder='Full Name' name='fullname' value={ formData.fullname } onChange={ handleInputChange } />
                    <Input placeholder='Email Address' name='email' value={ formData.email } onChange={ handleInputChange } />
                    <Input type='password' placeholder='Password' name='password' value={ formData.password } onChange={ handleInputChange } />
                    <Input type='password' placeholder='Confirm Password' name='cf_password' value={ formData.cf_password } onChange={ handleInputChange } />


                    <button className='btn-primary p-2 w-full'>Register</button>
                </form>
            </div>
        </div>

    </Layout>;
};

export default Login;