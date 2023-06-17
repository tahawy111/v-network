import { IComment, IPost, IUser } from '@/types/typescript';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import LikeBtn from '../Home/LikeBtn';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import CommentMenu from './CommentMenu';
import axios from 'axios';
import { likeComment, unLikeComment, updateComment } from '@/redux/features/post';
import CommentInput from '../Custom-Ui/CommentInput';

interface CommentCardProps {
    comment: IComment;
    post: IPost;
    newComment: boolean;
    setNewComment: (arg: boolean) => void;
    commentId: string;
}

export default function CommentCard({ comment, post, commentId }: CommentCardProps) {
    const { auth } = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();
    const [content, setContent] = useState<string>("");
    const [readMore, setReadMore] = useState<boolean>(false);
    const [isLike, setIsLike] = useState<boolean>(false);
    const [onEdit, setOnEdit] = useState<boolean>(false);
    const [loadLike, setLoadLike] = useState<boolean>(false);
    const [reply, setReply] = useState<{ onReply: boolean; comment: IComment; }>({ onReply: false, comment });



    const handleUpdate = async () => {
        if (comment.content !== content) {
            const { data } = await axios.put(`${process.env.API}/api/comment/${comment._id}`, { content }, { headers: { Authorization: auth.access_token } });
            dispatch(updateComment({ comment: data.comment, postId: post._id }));
            setOnEdit(false);
        } else {
            setOnEdit(false);

        }
    };

    useEffect(() => {
        setContent(comment.content);
    }, []);

    useEffect(() => {
        if (comment.likes.find(like => like._id === auth.user?._id)) {
            setIsLike(true);
        }
    }, [comment.likes, auth.user?._id]);

    const handleLike = async () => {
        if (loadLike) return;
        setIsLike(true);
        setLoadLike(true);


        const { data } = await axios.put(`${process.env.API}/api/comment/like/${comment._id}`, {}, { headers: { Authorization: auth.access_token } });

        dispatch(likeComment({ comment: data.comment, postId: post._id, userId: auth.user?._id }));


        setLoadLike(false);
    };


    const handleUnLike = async () => {
        if (loadLike) return;
        setIsLike(false);
        setLoadLike(true);
        const { data } = await axios.put(`${process.env.API}/api/comment/unLike/${comment._id}`, {}, { headers: { Authorization: auth.access_token } });
        dispatch(unLikeComment({ comment: data.comment, postId: post._id, userId: auth.user?._id }));
        setLoadLike(false);

    };

    const handleReply = () => {
        if (reply.onReply) return setReply((prev => {
            return { ...prev, onReply: false };
        }));
        setReply((prev => {
            return { ...prev, onReply: true, comment: { ...comment, commentId } };
        }));
    };



    return <div className={ `mt-2 ${comment._id ? "opacity-100 pointer-events-[inherit]" : "opacity-50 pointer-events-none"}` }>
        <Link className='flex text-stone-800 dark:text-stone-100 items-center' href={ `/profile/${comment.user._id}` }>
            <img src={ comment.user.avatar.url } className='w-12 h-12 rounded-full' alt="" />
            <h6 className='mx-1'>{ comment.user.username }</h6>
        </Link>

        <div className="bg-neutral-200 dark:bg-neutral-200/10 p-2 border rounded-md rounded-tl-none my-2 border-none grid grid-cols-12 items-center">
            <div className="flex-1 col-span-11">
                {
                    onEdit ? (<textarea className='border-none outline-none bg-inherit resize-none shadow-none' rows={ 5 } value={ content } onChange={ (e) => setContent(e.target.value) } />)
                        : (<div className={ `max-w-full` }>
                            <div className={ `text-ellipsis overflow-auto max-h-56` }>
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
                        </div>)
                }



                <div className="cursor-pointer">
                    <small className='text-muted mr-3'>
                        { moment(comment.createdAt).fromNow() }
                    </small>
                    <small className='mr-3 font-bold'>
                        { comment.likes.length } Likes
                    </small>
                    { onEdit
                        ? (<>
                            <small onClick={ () => setOnEdit(false) } className='mr-3 font-bold'>
                                Cancel
                            </small>
                            <small onClick={ handleUpdate } className='mr-3 font-bold'>
                                Update
                            </small>
                        </>)
                        : (<small onClick={ handleReply } className='mr-3 font-bold'>
                            { reply.onReply ? "Cancel" : "Reply" }
                        </small>) }
                </div>


            </div>

            <div className="flex cursor-pointer col-span-1">
                { auth.user?._id === comment.user._id && <CommentMenu post={ post } comment={ comment } auth={ auth } setOnEdit={ setOnEdit } /> }
                <LikeBtn isLike={ isLike } handleLike={ handleLike } handleUnLike={ handleUnLike } />
            </div>
        </div>

        { reply.onReply && (
            <CommentInput post={ post } reply={ reply } setReply={ setReply } />
        ) }

    </div>;
}
