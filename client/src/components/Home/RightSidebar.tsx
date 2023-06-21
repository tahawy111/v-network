import { useEffect, useState } from 'react';
import UserCard from '../Layout/UserCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IUser } from '@/types/typescript';
import axios from 'axios';
import FollowBtn from '../Profile/FollowBtn';

interface RightSidebarProps {

}

export default function RightSidebar({ }: RightSidebarProps) {
    const { auth } = useSelector((state: RootState) => state);
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<IUser[]>();
    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.API}/api/user/suggestions`, { headers: { Authorization: auth.access_token } });
            setUsers(data.users);
            setLoading(false);
        } catch (error) {

        }
    };

    useEffect(() => {

        if (auth.access_token) fetchData();

    }, [auth]);

    function removeDuplicatesUsers(users: IUser[]) {
        let unique: IUser[] = [];
        for (let i = 0; i < users.length; i++) {
            if (unique.findIndex(user => user._id === users[i]._id) === -1) {
                unique.push(users[i]);
            }

        }
        return unique.filter((user) => user._id !== auth.user?._id);
    }
    return <div>
        { auth.user && <UserCard user={ auth.user } /> }

        <div className="flex justify-between my-3 items-center">
            <h3 className='text-xl font-semibold'>Suggestions for you</h3>

            <svg onClick={ fetchData } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className={ `w-6 h-6 transition-transform font-bold duration-200 cursor-pointer ${loading && "animate-spin"}` }>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </div>

        { users && removeDuplicatesUsers(users).map((user) => <UserCard user={ user } />) }


    </div>;
}
