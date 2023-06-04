import { RootState } from "@/features/store";
import { IUser } from "@/types/typescript";
import { useState } from "react";
import { useSelector } from "react-redux";

interface FollowBtnProps {
  user: IUser;
  setUser: (param: IUser) => void;
}

export default function FollowBtn({ user, setUser }: FollowBtnProps) {
  const [followed, setFollowed] = useState<boolean>(false);
  const { user: signedUser } = useSelector((state: RootState) => state.auth);
  const handleUnFollow = () => {
    setFollowed(false);
  };
  const handleFollow = () => {

    setFollowed(true);
  };
  return (<>
    { followed ? (<>
      <button onClick={ handleUnFollow } className="btn-outline-green">Follow</button>
    </>) : (<>
      <button onClick={ handleFollow } className="btn-outline-red">UnFollow</button>
    </>) }
  </>);
}
