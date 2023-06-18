import { createComment } from '@/redux/features/post';
import { AppDispatch, RootState } from '@/redux/store';
import { IComment, IFormProps, IPost } from '@/types/typescript';
import axios from 'axios';
import clsx from 'clsx';
import { DetailedHTMLProps, FC, FormHTMLAttributes, ReactNode, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface InputProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    post: IPost;
    reply?: { onReply: boolean; comment: IComment; };
    setReply?: (arg: { onReply: boolean; comment: IComment; }) => void;
    children?: ReactNode;
}

const CommentInput: FC<InputProps> = ({ post, reply, setReply, children, ...props }) => {
    const { auth } = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);


    const handleSubmit = async (e: IFormProps) => {

        try {
            e.preventDefault();
            if (!inputRef.current?.value.trim()) {
                if (setReply && reply) return setReply({ ...reply, onReply: false });
                return
            }

            const newComment = {
                content: inputRef.current?.value,
                postId: post._id,
                likes: [],
                user: auth.user,
                createdAt: new Date().toISOString(),
                reply: reply && reply.comment._id,
                tag: reply && reply.comment.user,
            };

            console.log(newComment);


            inputRef.current.value = "";


            const { data } = await axios.post(`${process.env.API}/api/comment`, newComment, { headers: { Authorization: auth.access_token } });

            dispatch(createComment(data.newComment));

            if (setReply && reply) return setReply({ ...reply, onReply: false });

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