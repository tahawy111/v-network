import Image from 'next/image';
import { Inter } from 'next/font/google';
import Button from './components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="">
      <Button variant='outline-light' className=''>
        Login
      </Button>
    </div>
  );
}
