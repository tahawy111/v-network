import { useState } from 'react';
import CommentCard from './CommentCard';
import { IComment, IPost } from '@/types/typescript';

interface CommentDisplayProps {
    comment: IComment;
    post: IPost;
}

export default function CommentDisplay({ comment, post }: CommentDisplayProps) {
    const [newComment, setNewComment] = useState<boolean>(false);
    return <div className='py-2 px-6'><CommentCard newComment={newComment} setNewComment={setNewComment} comment={ comment } post={ post } /></div>;
}
