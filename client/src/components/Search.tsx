import { RootState } from "@/features/store";
import { IUser } from "@/types/typescript";
import axios from "axios";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
interface SearchProps {
    mobileNavActive: boolean;
}

export default function Search({ mobileNavActive }: SearchProps) {
    const searchRef = useRef<HTMLInputElement>(null);
    const { access_token } = useSelector((state: RootState) => state.auth);
    const [users, setUsers] = useState<IUser[]>();
    const [search, setSearch] = useState<string>("");
    useEffect(() => {
        const fetchData = async () => {

            try {
                const { data } = await axios.get(`${process.env.API}/api/user/search?username=${search}`, {
                    headers: {
                        Authorization: access_token
                    }
                });
                setUsers(data.users);
            } catch (error) {
                console.log("Not Found");
            }



        };

        if (search) {
            setTimeout(() => {
                fetchData();
            }, 400);
        }else {
            setUsers([])
        }
    }, [search]);
    console.log(users);

    return <form onSubmit={(e) => e.preventDefault()} className={ `relative w-full mx-1 md:w-1/3 m-5 text-black md:block ${mobileNavActive ? "block" : "hidden"}` }>
        <input ref={ searchRef } className="basic text-black" type="text" name="search" value={ search } onChange={ (e) => setSearch(e.target.value.toLowerCase().replace(/ /g, "")) } />
        <div onClick={ () => searchRef.current?.focus() } className={ `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black select-none items-center inline-flex ${search ? "opacity-0" : "opacity-30"}` }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span>Search</span>
        </div>
        <span onClick={() => {setUsers([]); setSearch("")}} className={`absolute text-red-500 text-3xl left-full -translate-x-6 top-full -translate-y-full leading-[3rem] cursor-pointer ${search || users && users?.length > 0 ? "block" : "hidden"}`}>&times;</span>
        <div className="">
            { users?.map((user: IUser) => (
                <Link key={ user._id } href={ `/profile/${user._id}` }><UserCard user={ user } /></Link>
            )) }
        </div>
    </form>;
}
