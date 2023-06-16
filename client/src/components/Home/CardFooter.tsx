import { IPost } from '@/types/typescript';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LikeBtn from './LikeBtn';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { likePost, unLikePost } from '@/redux/features/post';
import axios from 'axios';
import CommentInput from '../Custom-Ui/CommentInput';

interface CardFooterProps {
  post: IPost;
}

export default function CardFooter({ post }: CardFooterProps) {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [loadLike, setLoadLike] = useState<boolean>(false);
  const { post: postState, auth } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();
  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    dispatch(likePost({ post, auth }));
    await axios.put(`${process.env.API}/api/post/like/${post._id}`, { likeUserId: auth.user?._id }, { headers: { Authorization: auth.access_token } });
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    dispatch(unLikePost({ post, auth }));
    await axios.put(`${process.env.API}/api/post/unLike/${post._id}`, { likeUserId: auth.user?._id }, { headers: { Authorization: auth.access_token } });
    setLoadLike(false);

  };

  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user?._id)) {
      setIsLike(true);
    }
  }, [post.likes, auth.user?._id]);

  return <div className="">
    <div className='px-3'>
      <div className="flex justify-between cursor-pointer">
        <div className="flex items-center gap-1">

          <LikeBtn handleLike={ handleLike } handleUnLike={ handleUnLike } isLike={ isLike } />

          <Link href={ `/post/${post._id}` } className='text-gray-800'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6 text-2xl">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </Link>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6 text-2xl -translate-y-[3px] -rotate-45">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>

        </div>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6 text-2xl">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>

      </div>

      <div className="flex justify-between">
        <h6 className='px-1 cursor-pointer'>{ post.likes.length } likes</h6>
        <h6 className='cursor-pointer'>{ post.comments.length } comments</h6>
      </div>

      <h2 className='text-3xl'>Comments</h2>

    </div>
    <CommentInput post={ post }>

    </CommentInput>
  </div>;
}
