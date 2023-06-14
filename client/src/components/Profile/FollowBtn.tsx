import { RootState } from "@/redux/store";
import { getError } from "@/lib/getError";
import { IUser } from "@/types/typescript";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

interface FollowBtnProps {
  user: IUser;
  setUser: (param: IUser) => void;
}

export default function FollowBtn({ user, setUser }: FollowBtnProps): any {
  const [loading, setLoading] = useState<boolean>(false);
  const { user: signedUser, access_token } = useSelector((state: RootState) => state.auth);


  const handleFollow = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${process.env.API}/api/user/follow`, { followedId: user._id, followerId: signedUser?._id }, { headers: { Authorization: access_token } });
      setUser({ ...user, followers: data.user.followers, following: data.user.following });
      setLoading(false);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handleUnFollow = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${process.env.API}/api/user/unfollow`, { followedId: user._id, followerId: signedUser?._id }, { headers: { Authorization: access_token } });
      setUser({ ...user, followers: data.user.followers, following: data.user.following });
      setLoading(false);
    } catch (error) {
      toast.error(getError(error));
    }
  };




  return (<>

    { user && signedUser && (<>
      { user.followers.map((user) => user._id === signedUser._id).length > 0 ? (<>
        <button disabled={ loading } onClick={ handleUnFollow } className="btn-outline-red">UnFollow { loading && <ClipLoader color="#dc2626" size={ 10 } /> }</button>
      </>) : (<>
        <button disabled={ loading } onClick={ handleFollow } className="btn-outline-green">Follow { loading && <ClipLoader color="#0d9488" size={ 10 } /> }</button>
      </>) }
    </>) }

  </>);
}



