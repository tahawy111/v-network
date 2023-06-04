import { RootState } from "@/features/store";
import { getError } from "@/lib/getError";
import { IUser } from "@/types/typescript";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

interface FollowBtnProps {
  user: IUser;
  setUser: (param: IUser) => void;
}

export default function FollowBtn({ user, setUser }: FollowBtnProps) {
  if(!user) return <></>
  const { user: signedUser, access_token } = useSelector((state: RootState) => state.auth);
  if(!signedUser) return <></>
  const [followed, setFollowed] = useState<boolean>(user.followers.includes(signedUser._id.toString()));
  const [loading, setLoading] = useState<boolean>(false)
  

  const handleFollow = async () => {
    try {
      setLoading(true)
      setFollowed(true);
      const { data } = await axios.put(`${process.env.API}/api/user/follow`, { followedId: user._id, followerId: signedUser?._id }, { headers: { Authorization: access_token } });
      setUser(data.user);
      setLoading(false)
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handleUnFollow = async () => {
    try {
      setLoading(true)
      setFollowed(false);
      const { data } = await axios.put(`${process.env.API}/api/user/unfollow`, { followedId: user._id, followerId: signedUser?._id }, { headers: { Authorization: access_token } });
      setUser(data.user);
      setLoading(false)
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (<>
    { followed ? (<>
      <button disabled={loading} onClick={ handleUnFollow } className="btn-outline-red">UnFollow</button>
    </>) : (<>
      <button disabled={loading} onClick={ handleFollow } className="btn-outline-green">Follow</button>
    </>) }
  </>);
}
