// import {} from 'react';

// interface CarouselProps {
  
// }

// export default function Carousel({ }: CarouselProps) {
//   return <div>Carousel</div>
// }
import getThis from '@/lib/getThis';
import Image from 'next/image';
import { FC, useId, useState } from 'react';

interface ProductImagesProps {
    images: { public_id: string; url: string; }[];
}

const ProductImages: FC<ProductImagesProps> = ({ images }) => {
    const [imgIndex, setImgIndex] = useState(0);
    const DevImgsId = useId()

    return <>

        <div className={`group relative`}>
            <img className='p-1 w-full object-contain h-[520px]' src={images[imgIndex].url} alt={images[imgIndex].url} />
            <div className={`flex m-3 justify-between items-center`}>

                <svg onClick={() => setImgIndex((prev) => prev - 1 < 0 ? prev : prev - 1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`absolute -translate-y-1/2 hover:border transition-all hover:dark:border-white hover:bg-zinc-900/80 pr-1 rounded-full text-gray-800 left-1 top-1/2 w-12 h-12 hover:text-white cursor-pointer select-none ${images.length < 2 && "hidden"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>

                <svg onClick={() => setImgIndex((prev) => prev + 2 > images.length ? prev : prev + 1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`absolute right-1 hover:border transition-all hover:dark:border-white hover:bg-zinc-900/80 pl-1 rounded-full text-gray-800 -translate-y-1/2 top-1/2 w-12 h-12 hover:text-white cursor-pointer select-none ${images.length < 2 && "hidden"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>

            </div>
        </div>

    </>;
};

export default ProductImages;