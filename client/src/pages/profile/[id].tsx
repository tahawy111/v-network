import CardBody from "@/components/Home/CardBody";
import CardFooter from "@/components/Home/CardFooter";
import CardHeader from "@/components/Home/CardHeader";
import StatusModal from "@/components/Home/StatusModal";
import Layout from "@/components/Layout/Layout";
import EditProfile from "@/components/Profile/EditProfile";
import FollowBtn from "@/components/Profile/FollowBtn";
import ShowFollowers from "@/components/Profile/ShowFollowers";
import ShowFollowing from "@/components/Profile/showFollowing";
import { setProfileId, startLoading, stopLoading } from "@/redux/features/global";
import { getPosts, getUserPosts, increasePage } from "@/redux/features/post";
import { AppDispatch, RootState } from "@/redux/store";
import { IPost, IUser } from "@/types/typescript";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";


interface ProfileProps {

}

export default function Profile({ }: ProfileProps) {
    const { id } = useRouter().query;
    const [user, setUser] = useState<IUser>();
    const [userPosts, setUserPosts] = useState<IPost[]>();
    const { user: loggedUser, access_token } = useSelector((state: RootState) => state.auth);
    const { global, post } = useSelector((state: RootState) => state);
    const [currentTap, setCurrentTap] = useState<string>("posts");
    const [onEdit, setOnEdit] = useState<boolean>(false);
    const [isFollowersOpen, setIsFollowersOpen] = useState<boolean>(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();
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

    useEffect(() => {

        if (id && access_token) {
            dispatch(getUserPosts({ id: id as string, access_token, page: 1 }));
        }

        access_token && dispatch(getPosts({ access_token: access_token as string, page: post.page + 1 }));
        dispatch(increasePage(1));

    }, [id, access_token]);

    useEffect(() => {
        dispatch(setProfileId(id));
    }, []);


    const [btnHide, setBtnHide] = useState<boolean>(false);
    const loadMoreHandler = () => {
        if (post.postsLength === post.posts.length) {
            setBtnHide(true);
        }
        dispatch(getPosts({ access_token: access_token as string, page: post.page + 1 }));
        dispatch(increasePage(1));
    };



    return <Layout>
        <div className="flex flex-col items-center w-full">

            <div className="flex gap-12 items-center md:flex-nowrap flex-wrap justify-center p-2 w-full">
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

            { loggedUser?._id === id
                && <div className="border-t border-b dark:border-gray-100/30 w-full flex justify-center">
                    <button className={ `${currentTap === "posts" ? "opacity-100" : "opacity-50"} uppercase px-3 py-2 text-2xl font-semibold border-t border-b border-gray-400` } onClick={ () => setCurrentTap("posts") }>Posts</button>
                    <button className={ `${currentTap === "saved" ? "opacity-100" : "opacity-50"} uppercase px-3 py-2 text-2xl font-semibold border-t border-b border-gray-400` } onClick={ () => setCurrentTap("saved") }>Saved</button>
                </div>
            }
            { currentTap === "posts" && post.posts && post.userPosts && post.posts.filter((p) => post.userPosts.findIndex((t) => p._id === t._id) !== -1).map((post, index) => (
                <div className="w-full shadow-sm rounded-sm border border-gray-300 dark:border-gray-300/30 my-3" key={ index }>
                    <CardHeader inProfile post={ post } />
                    <CardBody post={ post } />
                    <CardFooter post={ post } />
                </div>
            )) }
            { global.status.statusModalShow && <StatusModal isInHomePage={ false } isInProfilePage /> }

            { currentTap === "saved" && loggedUser?.saved && post.posts.filter((p) => loggedUser.saved.findIndex((t) => p._id === t._id) !== -1).map((post, index) => (
                <div className="w-full shadow-sm rounded-sm border border-gray-300 dark:border-gray-300/30 my-3" key={ index }>
                    <CardHeader inProfile post={ post } />
                    <CardBody post={ post } />
                    <CardFooter post={ post } />
                </div>
            )) }


            { post.posts.length > 0 && currentTap === "posts" && <button onClick={ loadMoreHandler } className={ `btn btn-red my-3 w-fit ${btnHide && "hidden"}` }>{ post.isLoading ? <ClipLoader size={ 15 } color='white' /> : "Load More..." }</button> }


        </div>

    </Layout>;
}
