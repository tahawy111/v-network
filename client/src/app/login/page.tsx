"use client"
import Input from '@/components/Input';
import { InputChange } from '@/types/typescript';
import Head from 'next/head';
import { FC, useState } from 'react';

interface LoginProps {

}

const Login: FC<LoginProps> = ({ }) => {
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
    return <div>
        <Head>
            <title>V-NETWORK - Login</title>
        </Head>


        <div className="flex justify-center w-full h-screen items-center">
            <div className="border-2 max-w-sm p-5">
                <h3 className="font-light text-center">V-NETWORK - Login</h3>
                <form>
                    <Input placeholder='Email Address' />
                    <Input placeholder='Password' />

                    <button className='btn-primary p-2' onChange={ (e) => console.log('') }>Login</button>
                </form>
            </div>
        </div>

    </div>;
};

export default Login;