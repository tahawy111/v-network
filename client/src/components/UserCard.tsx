import { IUser } from "@/types/typescript";

interface UserCardProps {
    user: IUser;
}

export default function UserCard({ user }: UserCardProps) {
    return <div className="flex bg-stone-50 p-1 items-center absolute w-full border border-slate-200 rounded-sm hover:underline">
        <div><img className="select-none w-5 md:w-10" src={ user?.avatar } /></div>
        <div className="ml-1">
            <span className="block">{user.username}</span>
            <small>{user.fullname}</small>
        </div>
    </div>;
}
