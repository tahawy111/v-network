import Layout from "@/components/Layout/Layout";
import EditProfile from "@/components/Profile/EditProfile";
import FollowBtn from "@/components/Profile/FollowBtn";
import { startLoading, stopLoading } from "@/features/global/global";
import { AppDispatch, RootState } from "@/features/store";
import { IUser } from "@/types/typescript";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


interface ProfileProps {

}

export default function Profile({ }: ProfileProps) {
    const { id } = useRouter().query;
    const [user, setUser] = useState<IUser>();
    const dispatch: AppDispatch = useDispatch();
    const loggedUser = useSelector((state: RootState) => state.auth.user);
    const [onEdit, setOnEdit] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            dispatch(startLoading());
            const { data } = await axios.get(`${process.env.API}/api/user/${id}`);
            setUser(data.user);
            dispatch(stopLoading());

        };

        if (id) {
            fetchData();
        }
    }, [id]);


    return <Layout>
        <div className="flex gap-12 items-center">
            <img src={ user?.avatar } className="w-64" alt="" />
            <div className="flex justify-between w-full items-center">
                <div className="">
                    <div className="flex w-full justify-between items-center">
                        <h1 className="text-4xl font-semibold">{ user?.username }</h1>
                    </div>
                    <div className="flex gap-x-11">
                        <p className="text-md text-teal-600 cursor-pointer hover:underline">{ user?.followers.length } Followers</p>
                        <p className="text-md text-teal-600 cursor-pointer hover:underline">{ user?.following.length } Following</p>
                    </div>
                    <p className="text-md">{ user?.fullname }</p>
                    <p className="text-md">{ user?.email }</p>
                    <a href={ user?.website } className="text-md text-teal-600 hover:underline">{ user?.website }</a>
                    <a className="text-md">{ user?.story }</a>
                </div>

                { id === loggedUser?._id ? (
                    <div className="">
                        <button onClick={ () => setOnEdit(true) } className="btn-outline-green my-1">Edit Profile</button>
                        { onEdit && <EditProfile user={ user! } setOnEdit={ setOnEdit } /> }
                    </div>
                ) : (<FollowBtn />) }
            </div>
        </div>
    </Layout>;
}
