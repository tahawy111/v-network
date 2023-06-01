"use client";
import Input from '@/components/Custom-Ui/Input';
import Layout from '@/components/Layout/Layout';
import { login } from '@/features/auth/authSlice';
import { startLoading, stopLoading } from '@/features/global/global';
import { AppDispatch, RootState } from '@/features/store';
import { validEmail } from '@/lib/validation';
import { IFormProps, InputChange } from '@/types/typescript';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

interface LoginProps {

}

const Login: FC<LoginProps> = ({ }) => {
    const dispatch: AppDispatch = useDispatch();
    const { access_token } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    interface ILoginProps {
        email: string;
        password: string;
    }
    const [formData, setFormData] = useState<ILoginProps>({
        email: "",
        password: ""
    });
    const handleInputChange = ({ target }: InputChange) => {
        setFormData((v: any) => ({ ...formData, [target.name]: target.validity.valid ? target.value : v[target.name] }));
    };
    const handleSubmit = async (e: IFormProps) => {
        e.preventDefault();

        if (!formData.email || !formData.password) return toast.error("Please fill in all fields.");
        if (!validEmail(formData.email)) return toast.error("Email isn't valid.");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 chars.");
        dispatch(startLoading());

        await dispatch(login(formData));
        dispatch(stopLoading());
        router.push('/');
    };
    // useEffect(() => {
    //     if (access_token) router.push(`/`);
    // }, [access_token, router]);
    return <Layout>
        <Head>
            <title>V-NETWORK - Login</title>
        </Head>


        <div className="flex justify-center w-full h-screen items-center">
            <div className="border-2 max-w-sm p-5">
                <h3 className="font-light text-center">V-NETWORK - Login</h3>
                <form onSubmit={ handleSubmit }>
                    <Input placeholder='Email Address' name='email' value={ formData.email } onChange={ handleInputChange } />
                    <Input type='password' placeholder='Password' name='password' value={ formData.password } onChange={ handleInputChange } />


                    <button className='btn-primary p-2 w-full'>Login</button>
                </form>
                <span className='my-1 inline-block'>
                    I don't have an account <Link href='/register' className='text-red-500'>Register</Link>
                </span>
            </div>
        </div>

    </Layout>;
};

export default Login;