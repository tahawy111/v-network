import { RootState } from '@/redux/store';
import { } from 'react';
import { useSelector } from 'react-redux';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

interface PostsProps {

}

export default function Posts({ }: PostsProps) {
  const { post } = useSelector((state: RootState) => state);
  return <div>

    { !post.loading && post.posts.length > 0 && post.posts.map((post) => (
      <div className="w-full shadow-md rounded-md" key={ post._id }>
        <CardHeader post={ post } />
        <CardBody post={ post } />
        <CardFooter post={ post } />
      </div>
    )) }

  </div>;
}
