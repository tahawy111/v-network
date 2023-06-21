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
    followers: IUser[];
    following: IUser[];
    saved: IPost[];
}

export interface IPost {
    _id: string;
    content: string;
    images: { public_id: string; url: string; }[];
    likes: any[];
    comments: IComment[];
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
}

export interface IComment {
    _id: string;
    content: string;
    tag: IUser;
    reply: string;
    likes: IUser[];
    user: IUser;
    postId: string;
    postUserId: string;
    createdAt: Date;
}

