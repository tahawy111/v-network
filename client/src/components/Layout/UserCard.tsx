import { IUser } from "@/types/typescript";

interface UserCardProps {
    user: IUser;
    children?: React.ReactNode;
}

export default function UserCard({ user, children }: UserCardProps) {


        return <div className="flex bg-stone-50 p-1 items-center w-full border border-slate-200 rounded-sm hover:underline justify-between">
            <div className="flex">
                <img className="select-none w-5 md:w-10 block object-contain" src={ user?.avatar.url } />
                <div className="ml-1">
                    <span className="block">{ user.username }</span>
                    <small>{ user.fullname }</small>
                </div>
            </div>
            { children && <div className="">{ children }</div> }
        </div>;
}
