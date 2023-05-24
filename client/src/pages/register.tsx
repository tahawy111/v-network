"use client";
import Input from '@/components/Input';
import Layout from '@/components/Layout';
import { login, register } from '@/features/auth/authSlice';
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
        username: string;
        email: string;
        password: string;
        cf_password: string;
        gender: string;
    }
    const dispatch: AppDispatch = useDispatch();
    const [formData, setFormData] = useState<ILoginProps>({
        fullname: "",
        username: "",
        email: "",
        password: "",
        cf_password: "",
        gender: ""
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

        await dispatch(register({ fullname: formData.fullname, email: formData.email, password: formData.password, gender: formData.gender, username: formData.username }));

        dispatch(stopLoading());
    };
    return <Layout>
        <Head>
            <title>V-NETWORK - Register</title>
        </Head>


        <div className="flex justify-center w-full h-screen items-center">
            <div className="border-2 max-w-sm p-5 ">
                <h3 className="font-light text-center">V-NETWORK - Register</h3>
                <form onSubmit={ handleSubmit }>
                    <Input placeholder='Full Name' name='fullname' value={ formData.fullname } onChange={ handleInputChange } />
                    <Input placeholder='User Name' name='username' value={ formData.username } onChange={ handleInputChange } />
                    <Input placeholder='Email Address' type='email' name='email' value={ formData.email } onChange={ handleInputChange } />
                    <Input type='password' placeholder='Password' name='password' value={ formData.password } onChange={ handleInputChange } />
                    <Input type='password' placeholder='Confirm Password' name='cf_password' value={ formData.cf_password } onChange={ handleInputChange } />

                    <div className='flex justify-between my-1'>


                        <Input value={ formData.gender } onChange={ handleInputChange } name='gender' placeholder='Male' type='radio' />
                        <Input value={ formData.gender } onChange={ handleInputChange } name='gender' placeholder='Female' type='radio' />

                    </div>

                    <button className='btn-primary p-2 w-full'>Register</button>
                </form>
            </div>
        </div>

    </Layout>;
};

export default Login;