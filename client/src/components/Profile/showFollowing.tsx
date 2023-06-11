import { Dispatch } from "@reduxjs/toolkit";
import { IFormProps, IUser, InputChange } from "../../types/typescript";
import { SetStateAction, useEffect, useId, useState } from "react";
import Input from "../Custom-Ui/Input";
import getThis from "@/lib/getThis";
import { checkImage, imageUpload } from "@/lib/imageUpload";
import { toast } from "react-hot-toast";
import axios from "axios";
import { getError } from "@/lib/getError";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/features/store";
import { startLoading, stopLoading } from "@/features/global";
import { setUser as setGlobalUser } from "@/features/auth";
import FollowBtn from "./FollowBtn";
import UserCard from "../Layout/UserCard";
import Link from "next/link";




interface EditProfileProps {
    followingIds: string[];
    onShow: (param: boolean) => void;
    setUser: (param: IUser) => void;
}

export default function ShowFollowing({ followingIds, onShow, setUser }: EditProfileProps) {
    const { auth } = useSelector((state: RootState) => state);
    const [Following, setFollowing] = useState<IUser[]>();
    useEffect(() => {
        axios.post(`${process.env.API}/api/user/getUsers`, { ids: followingIds }, { headers: { Authorization: auth.access_token } }).then(({ data }) => setFollowing(data.users));
    }, []);

    return <div className="w-full fixed top-0 left-0 h-screen bg-[#0008] overflow-auto flex items-center">



        <div className="max-w-md w-full bg-white p-5 rounded-md mx-auto my-5 relative">
            <button className="absolute btn-outline-red text-xl top-5 right-5" onClick={ () => onShow(false) }>&times;</button>

            <div className="mt-12">
                {
                    Following && Following.length > 0 && Following.map((user: IUser) => (
                        <Link key={ user._id } href={ `/profile/${user._id}` }>
                            <UserCard user={ user } >
                            </UserCard>
                        </Link>
                    ))
                }
            </div>

        </div>



    </div>;
}
