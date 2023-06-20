import { AppDispatch, RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { startLoading } from '@/redux/features/global';
import { getPosts, increasePage } from '@/redux/features/post';
import { ClipLoader } from 'react-spinners';

interface PostsProps {

}

export default function Posts({ }: PostsProps) {
  const { post, auth } = useSelector((state: RootState) => state);
  const [btnHide, setBtnHide] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const loadMoreHandler = () => {
    if (post.postsLength === post.posts.length) {
      setBtnHide(true);
    }
    dispatch(getPosts({ access_token: auth.access_token as string, page: post.page + 1 }));
    dispatch(increasePage(1));
  };
  return <div className='flex items-center flex-col'>

    { !post.loading && post.posts.length > 0 && post.posts.map((post, index) => (
      <div className="w-full shadow-sm rounded-sm border border-gray-300 dark:border-gray-300/30 my-3" key={ index }>
        <CardHeader post={ post } />
        <CardBody post={ post } />
        <CardFooter post={ post } />
      </div>
    )) }

    { post.posts.length > 0 && <button onClick={ loadMoreHandler } className={ `btn btn-red my-3 w-fit ${btnHide && "hidden"}` }>{post.isLoading ? <ClipLoader size={15} color='white' /> : "Load More..." }</button> }

  </div>;
}
