import { IPost } from '@/types/typescript';
import { } from 'react';
import CommentDisplay from '../Comments/CommentDisplay';

interface CommentsProps {
    post: IPost;
}

export default function Comments({ post }: CommentsProps) {
    return <div>
        {
            post.comments.map((comment) => (
                <CommentDisplay key={ comment._id } comment={ comment } post={ post } />
            ))
        }
    </div>;
}
