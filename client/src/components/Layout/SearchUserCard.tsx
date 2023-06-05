import { IUser } from "@/types/typescript";

interface SearchUserCardProps {
    user: IUser;
    setShowFollowers?: (param: boolean) => void;
    children?: React.ReactNode;
}

export default function SearchUserCard({ user, children }: SearchUserCardProps) {
    return <div className="">
        <div className="flex bg-stone-50 p-1 items-center absolute w-full border border-slate-200 rounded-sm hover:underline">
            <img className="select-none w-5 md:w-10 block" src={ user?.avatar.url } />
            <div className="ml-1">
                <span className="block">{ user.username }</span>
                <small>{ user.fullname }</small>
            </div>
        </div>
        { children && <div className="">{ children }</div> }
    </div>;
}
