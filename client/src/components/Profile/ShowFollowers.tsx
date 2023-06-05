import { Dispatch } from "@reduxjs/toolkit";
import { IFormProps, IUser, InputChange } from "../../types/typescript";
import { SetStateAction, useId, useState } from "react";
import Input from "../Custom-Ui/Input";
import getThis from "@/lib/getThis";
import { checkImage, imageUpload } from "@/lib/imageUpload";
import { toast } from "react-hot-toast";
import axios from "axios";
import { getError } from "@/lib/getError";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/features/store";
import { startLoading, stopLoading } from "@/features/global/global";
import { setUser as setGlobalUser } from "@/features/auth/authSlice";




interface EditProfileProps {
    user: IUser;
    onShow: (param: boolean) => void;
}

export default function ShowFollowers({ user, onShow }: EditProfileProps) {

    return <div className="w-full fixed top-0 left-0 h-screen bg-[#0008] overflow-auto">


        <button className="btn-red absolute top-5 right-5" onClick={ () => onShow(false) }>Close</button>

        <div className="max-w-md w-full bg-white p-5 rounded-md mx-auto my-5">
            followers
        </div>



    </div>;
}
