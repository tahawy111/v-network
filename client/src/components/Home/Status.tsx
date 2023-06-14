import { AppDispatch, RootState } from '@/redux/store';
import { } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatusModal from "./StatusModal";
import { setStatusModalShow } from '@/redux/features/global';

interface StatusProps {

}

export default function Status({ }: StatusProps) {
    const { auth, global } = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();
    const { user } = auth;
    return <div className={`my-3 shadow-md p-3 rounded-md dark:shadow-gray-100/10 ${!user ? "hidden" : "flex"}`}>
        { global.status.statusModalShow && <StatusModal /> }
        <img src={ user?.avatar?.url } alt="" className="w-16 h-16 rounded-full" />

        <button onClick={ () => dispatch(setStatusModalShow(true)) } className="bg-gray-200 rounded-full text-zinc-800 px-3 m-1 flex-1 text-left hover:bg-gray-300">{ user?.username }, What are you thinking?</button>
    </div>;
}
