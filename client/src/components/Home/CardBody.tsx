import { IPost } from '@/types/typescript';
import { useState } from 'react';
import Carousel from '../Custom-Ui/Carousel';

interface CardBodyProps {
    post: IPost;
}

export default function CardBody({ post }: CardBodyProps) {
    const [readMore, setReadMore] = useState<boolean>(false);
    return <div className=''>
        <div className="flex flex-wrap mx-3 my-2">
            <span className='overflow-auto'>{ post.content.length < 60 ? post.content : readMore ? post.content + " " : post.content.slice(0, 60) + ".... " }</span>
            {post.content.length > 60 && <span className='cursor-pointer text-red-500' onClick={(() => setReadMore((prev) => !prev))}>{readMore ? "Hide Content" : "Read More"}</span>}
        </div>
        { post.images.length > 0 && <Carousel images={ post.images } /> }
    </div>;
}
