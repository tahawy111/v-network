import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
export type IFormProps = FormEvent<HTMLFormElement>;


export interface IUser {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    avatar: { public_id: string; url: string; };
    role: string;
    gender: string;
    mobile: string;
    address: string;
    story: string;
    website: string;
    followers: string[];
    following: string[];
    saved: string;
}