import { RootState } from '@/features/store';
import { } from 'react';
import { useSelector } from 'react-redux';

interface StatusProps {

}

export default function Status({ }: StatusProps) {
    const { user } = useSelector((state: RootState) => state.auth);
    return <div className='flex my-3 shadow-md p-3 rounded-md'>
        <img src={user?.avatar.url} alt="" className="w-16 h-16" />

        <button className="bg-gray-200 rounded-full text-zinc-800 px-3 m-1 flex-1 text-left hover:bg-gray-300">{user?.username}, What are you thinking?</button>
    </div>;
}
