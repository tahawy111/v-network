import { IComment, IPost } from '@/types/typescript';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import LikeBtn from '../Home/LikeBtn';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CommentMenu from './CommentMenu';

interface CommentCardProps {
    comment: IComment;
    post: IPost;
    newComment: boolean;
    setNewComment: (arg: boolean) => void;
}

export default function CommentCard({ comment, post }: CommentCardProps) {
    const { auth } = useSelector((state: RootState) => state);
    const [content, setContent] = useState<string>("");
    const [readMore, setReadMore] = useState<boolean>(false);
    const [isLike, setIsLike] = useState<boolean>(false);
    const commentDivId = useId()
    const handleLike = () => {

    };

    const handleUnLike = () => {

    };

    useEffect(() => {
        setContent(comment.content);
    }, []);

    return <div className={ `mt-2 ${comment._id ? "opacity-100 pointer-events-[inherit]" : "opacity-50 pointer-events-none"}` }>
        <Link className='flex text-stone-800 dark:text-stone-100 items-center' href={ `/profile/${comment.user._id}` }>
            <img src={ comment.user.avatar.url } className='w-12 h-12 rounded-full' alt="" />
            <h6 className='mx-1'>{ comment.user.username }</h6>
        </Link>

        <div className="bg-neutral-200 dark:bg-neutral-200/10 p-2 border rounded-md rounded-tl-none my-2 border-none grid grid-cols-12 items-center">
            <div className="flex-1 col-span-11">
                <div  className={ `max-w-full` }>
                    <div className={`text-ellipsis overflow-auto`}>
                        {
                            content.length < 100 ? content : readMore ? content + "" : content.slice(0, 60) + "...."
                        }
                    </div>

                    {
                        content.length > 100 &&
                        <span className='cursor-pointer text-red-500' onClick={ () => setReadMore((prev) => !prev) }>
                            { readMore ? "Hide Content" : "Read More" }
                        </span>
                    }
                </div>



                <div className="cursor-pointer">
                    <small className='text-muted mr-3'>
                        { moment(comment.createdAt).fromNow() }
                    </small>
                    <small className='mr-3 font-bold'>
                        { comment.likes.length } Likes
                    </small>
                    <small className='mr-3 font-bold'>
                        Reply
                    </small>
                </div>


            </div>

            <div className="flex cursor-pointer col-span-1">
                <CommentMenu post={ post } comment={ comment } auth={ auth } />
                <LikeBtn isLike={ isLike } handleLike={ handleLike } handleUnLike={ handleUnLike } />
            </div>
        </div>
    </div>;
}
