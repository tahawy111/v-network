import { useEffect, useState } from 'react';
import CommentCard from './CommentCard';
import { IComment, IPost } from '@/types/typescript';

interface CommentDisplayProps {
    comment: IComment;
    post: IPost;
    replyCm: IComment[];
}

export default function CommentDisplay({ comment, post, replyCm }: CommentDisplayProps) {
    const [newComment, setNewComment] = useState<boolean>(false);
    const [showRep, setShowRep] = useState<IComment[]>([]);
    const [next, setNext] = useState<number>(1);

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next));
    }, [replyCm, next]);

    return <div className='py-2 px-6'>
        <CommentCard newComment={ newComment } setNewComment={ setNewComment } comment={ comment } post={ post } commentId={ comment._id } >
            <div className="pl-5">
                { showRep.map((item, index) => (
                    item.reply && <CommentCard comment={ item } key={ index } post={ post } commentId={ comment._id } />
                )) }

                {
                    replyCm.length - next > 0
                        ? <div onClick={ () => setNext(next + 10) } className='cursor-pointer text-rose-800'>
                            See More Replies...
                        </div>

                        : replyCm.length > 1 && <div onClick={ () => setNext(1) } className='cursor-pointer text-rose-800'>
                            Hide Replies...
                        </div>
                }
                

            </div>
        </CommentCard>
    </div>;
}
