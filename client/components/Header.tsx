import Link from 'next/link';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// make links component to repeat it in any place

interface HeaderProps {

}

const Header: FC<HeaderProps> = ({ }) => {
    const [mobileNavActive, setMobileNavActive] = useState<boolean>(true);
    const router = useRouter()

    return <div className='bg-main'>

        <div className="big-center flex justify-between">
            <Link className='text-white' href={'/'}>Ecommerce</Link>
            <nav className={`pl-7 z-10 ${mobileNavActive ? "block" : "hidden"} fixed top-0 bottom-0 left-0 right-0 p-5 bg-main md:flex md:static md:bg-transparent md:p-0`}>
                {mobileNavActive && <div className='flex items-center justify-between'>
                    <Link className='text-white my-3 block md:hidden' href={'/'}>Ecommerce</Link>
                    <svg onClick={() => setMobileNavActive((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </div>}
                <Link className={`text-gray-100/70 px-2 block py-1 md:py-0`} href={'/'}>Home</Link>
                <Link className={`text-gray-100/70 px-2 block py-1 md:py-0`} href={'/products'}>All products</Link>
                <Link className={`text-gray-100/70 px-2 block py-1 md:py-0`} href={'/categories'}>Categories</Link>
            </nav>
        </div>



    </div>;
};

export default Header;