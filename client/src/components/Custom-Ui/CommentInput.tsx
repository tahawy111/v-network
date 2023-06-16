import { createComment } from '@/redux/features/post';
import { AppDispatch, RootState } from '@/redux/store';
import { IFormProps, IPost } from '@/types/typescript';
import axios from 'axios';
import clsx from 'clsx';
import { DetailedHTMLProps, FC, FormHTMLAttributes, ReactNode, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface InputProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    children: ReactNode;
    post: IPost;
}

const CommentInput: FC<InputProps> = ({ children, post, ...props }) => {
    const { auth } = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);


    const handleSubmit = async (e: IFormProps) => {

        try {
            e.preventDefault();
            if (!inputRef.current?.value.trim()) return;

            const newComment = {
                content: inputRef.current?.value,
                postId: post._id,
                likes: [],
                user: auth.user,
                createdAt: new Date().toISOString()
            };

            inputRef.current.value = "";

            dispatch(createComment(newComment));

            await axios.post(`${process.env.API}/api/comment`, newComment, { headers: { Authorization: auth.access_token } });


        } catch (error) {

        }

    };

    return (<form onSubmit={ handleSubmit } className={ clsx("flex items-center bg-stone-100 dark:bg-stone-900 px-3", props.className) } { ...props }>
        { children }
        <input ref={ inputRef } className='border-none outline-none bg-transparent overflow-auto' type="text" placeholder='Add Your Comment' />
        <button className='text-blue-600 font-semibold'>Post</button>
    </form>);
};

export default CommentInput;