import { IUser } from "@/types/typescript";
import Link from "next/link";

interface UserCardProps {
    user: IUser;
    children?: React.ReactNode;
}

export default function UserCard({ user, children }: UserCardProps) {


    return <div className="flex p-1 items-center w-full hover:underline justify-between">
        <Link className="w-full" href={ `/profile/${user._id}` }>
            <div className="flex items-center gap-x-3">
                { user.avatar && <img className="select-none w-10 h-10 md:w-10 block object-contain rounded-full" src={ user?.avatar.url } /> }
                <div className="ml-1">
                    <span className="block">{ user.username }</span>
                    <small>{ user.fullname }</small>
                </div>
            </div>
        </Link>
        { children && <div className="">{ children }</div> }
    </div>;
}
