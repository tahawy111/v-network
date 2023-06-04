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
  const { user: signedUser, access_token } = useSelector((state: RootState) => state.auth);
  const [followed, setFollowed] = useState<boolean>(user && user.followers.includes(signedUser?._id.toString()!));
  

  const handleUnFollow = () => {
    setFollowed(false);
  };
  const handleFollow = async () => {
    try {
      const { data } = await axios.put(`${process.env.API}/api/user/follow`, { followedId: user._id, followerId: signedUser?._id }, { headers: { Authorization: access_token } });
      setFollowed(true);
      setUser(data.user);
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (<>
    { followed && signedUser && user ? (<>
      <button onClick={ handleUnFollow } className="btn-outline-red">UnFollow</button>
    </>) : (<>
      <button onClick={ handleFollow } className="btn-outline-green">Follow</button>
    </>) }
  </>);
}
