import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout/Layout';
import Status from '@/components/Home/Status';
import Posts from '@/components/Home/Posts';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <div className='grid grid-cols-12 mx-0'>
        <div className="col-span-8">
          <Status />
          <Posts />
        </div>
        <div className="col-span-4"></div>
      </div>
    </Layout>
  );
}
