import { IComment, IPost } from '@/types/typescript';
import { useEffect, useState } from 'react';
import CommentDisplay from '../Comments/CommentDisplay';

interface CommentsProps {
    post: IPost;
}

export default function Comments({ post }: CommentsProps) {
    const [comments, setComments] = useState<IComment[]>([]);
    const [showComments, setShowComments] = useState<IComment[]>([]);
    const [next, setNext] = useState<number>(2);

    useEffect(() => {
        const newCm = post.comments.filter((cm) => !cm.reply);
        setComments(newCm);
        setShowComments(newCm.slice(newCm.length - next));
    }, [post.comments, next]);

    return <div>
        {
            showComments.map((comment) => (
                <CommentDisplay key={ comment._id } comment={ comment } post={ post } />
            ))
        }


        {
            comments.length - next > 0
                ? <div onClick={() => setNext(prev => prev + 10)} className='p-2 border-t cursor-pointer text-rose-800'>
                    See More Comments...
                </div>

                : comments.length > 2 && <div onClick={() => setNext(2)} className='p-2 border-t cursor-pointer text-rose-800'>
                    Hide Comments...
                </div>
        }
    </div>;
}
