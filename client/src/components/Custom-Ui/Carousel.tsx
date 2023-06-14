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

        <div className={`relative`}>
            <img className='border border-[#ddd] rounded-lg p-1 w-full object-contain h-[520px]' src={images[imgIndex].url} alt={images[imgIndex].url} />
            <div className={`flex m-3 justify-between items-center`}>

                <svg onClick={() => setImgIndex((prev) => prev - 1 < 0 ? prev : prev - 1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`absolute -translate-y-1/2 bg-gray-100/40 rounded-md dark:bg-gray-100/10 border border-gray-800 text-gray-800 left-1 top-1/2 w-12 h-12 cursor-pointer select-none ${images.length < 3 && "pointer-events-none opacity-50 -z-[1]"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>

                <svg onClick={() => setImgIndex((prev) => prev + 2 > images.length ? prev : prev + 1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`absolute right-1 bg-gray-100/40 rounded-md dark:bg-gray-100/10 border border-gray-800 text-gray-800 -translate-y-1/2 top-1/2 w-12 h-12 cursor-pointer select-none ${images.length < 3 && "pointer-events-none opacity-50 -z-[1]"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>

            </div>
        </div>

    </>;
};

export default ProductImages;