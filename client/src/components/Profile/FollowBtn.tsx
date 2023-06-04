import { useState } from "react";

interface FollowBtnProps {

}

export default function FollowBtn({ }: FollowBtnProps) {
  const [followed, setFollowed] = useState<boolean>(false);
  const handleUnFollow = () => {
    setFollowed(false)
   };
  const handleFollow = () => { 
    setFollowed(true)
  };
  return (<>
    { followed ? (<>
      <button onClick={ handleUnFollow } className="btn-outline-green">Follow</button>
    </>) : (<>
      <button onClick={ handleFollow } className="btn-outline-red">UnFollow</button>
    </>) }
  </>);
}
