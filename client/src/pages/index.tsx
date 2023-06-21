import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout/Layout';
import Status from '@/components/Home/Status';
import Posts from '@/components/Home/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { startLoading } from '@/redux/features/global';
import Spinner from '@/components/Custom-Ui/Spinner';
import RightSidebar from '@/components/Home/RightSidebar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { post } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();
  return (
    <Layout>
      <div className='grid grid-cols-12 mx-0'>
        <div className="md:col-span-8 col-span-12">
          <Status />

          <Posts />

        </div>
        <div className="col-span-4 m-3">
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
}
