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
    const [replyComments, setReplyComments] = useState<IComment[]>([]);

    useEffect(() => {
        const newCm = post.comments.filter((cm) => !cm.reply);
        setComments(newCm);
        setShowComments(newCm.slice(newCm.length - next));
    }, [post.comments, next]);

    useEffect(() => {
        const newRep = post.comments.filter((cm) => cm.reply);
        setReplyComments(newRep);
    }, [post.comments]);

    return <div>
        {
            showComments.map((comment) => (
                <CommentDisplay key={ comment._id } comment={ comment } post={ post } replyCm={ replyComments.filter((item) => item.reply === comment._id) } />
            ))
        }


        {
            comments.length - next > 0
                ? <div onClick={ () => setNext(comments.length) } className='p-2 border-t cursor-pointer text-rose-800'>
                    See More Comments...
                </div>

                : comments.length > 2 && <div onClick={ () => setNext(2) } className='p-2 border-t cursor-pointer text-rose-800'>
                    Hide Comments...
                </div>
        }
    </div>;
}
