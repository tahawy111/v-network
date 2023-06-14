import Layout from "@/components/Layout/Layout";
import EditProfile from "@/components/Profile/EditProfile";
import FollowBtn from "@/components/Profile/FollowBtn";
import ShowFollowers from "@/components/Profile/ShowFollowers";
import ShowFollowing from "@/components/Profile/showFollowing";
import { startLoading, stopLoading } from "@/redux/features/global";
import { AppDispatch, RootState } from "@/redux/store";
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
    const [isFollowersOpen, setIsFollowersOpen] = useState<boolean>(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState<boolean>(false);
    const router = useRouter();
    router.events?.on("routeChangeStart", () => {
        setOnEdit(false);
        setIsFollowersOpen(false);
    });
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
        <div className="flex gap-12 items-center md:flex-nowrap flex-wrap justify-center p-2">
            <img src={ user?.avatar.url } className="w-64" alt="" />
            <div className="flex justify-between w-full items-center">
                <div className="w-full">
                    <div className="flex w-full justify-between items-center">
                        <h1 className="text-4xl font-semibold">{ user?.username }</h1>
                        { id === loggedUser?._id ? (
                            <div className="">
                                <button onClick={ () => setOnEdit(true) } className="btn-outline-green my-1">Edit Profile</button>
                                { onEdit && <EditProfile setUser={ setUser } user={ user! } setOnEdit={ setOnEdit } /> }
                            </div>
                        ) : (<FollowBtn setUser={ setUser } user={ user! } />) }
                    </div>
                    <div className="flex gap-x-11">
                        <p onClick={ () => setIsFollowersOpen(true) } className="text-md text-teal-600 cursor-pointer hover:underline">{ user?.followers.length } Followers</p>
                        { isFollowersOpen && user && <ShowFollowers setUser={ setUser } followersIds={ typeof user.followers[0] === "string" ? user.followers as any : user.followers.map((u) => u._id) as any } onShow={ setIsFollowersOpen } /> }
                        <p onClick={ () => setIsFollowingOpen(true) } className="text-md text-teal-600 cursor-pointer hover:underline">{ user?.following.length } Following</p>
                        { isFollowingOpen && user && <ShowFollowing setUser={ setUser } followingIds={ typeof user.followers[0] === "string" ? user.followers as any : user.followers.map((u) => u._id) as any } onShow={ setIsFollowingOpen } /> }

                    </div>
                    <p className="text-md">{ user?.fullname }</p>
                    <p className="text-md">{ user?.email }</p>
                    <a href={ user?.website } className="text-md text-teal-600 hover:underline">{ user?.website }</a>
                    <p className="text-md">{ user?.story }</p>
                </div>
            </div>
        </div>
    </Layout>;
}
