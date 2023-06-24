import { likePost } from '@/redux/features/post';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface SocketClientProps {

}

export default function SocketClient({ }: SocketClientProps) {
    const { global, auth } = useSelector((state: RootState) => state);
    const { socket } = global;
    const dispatch: AppDispatch = useDispatch();

    // joinUser
    useEffect(() => {
        socket?.emit("joinUser", auth.user?._id);
    }, [socket, auth.user?._id]);

    // Likes
    useEffect(() => {
        socket?.on("likeToClient", post => {
            dispatch(likePost({ post, auth }));
        });
        return () => { socket?.off("likeToClient"); };
    }, [socket]);
    return <></>;
}
