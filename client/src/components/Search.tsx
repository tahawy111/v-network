import { useState, useRef, useEffect } from "react";
interface SearchProps {
    mobileNavActive: boolean;
}

export default function Search({ mobileNavActive }: SearchProps) {
    const searchRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>("");
    useEffect(() => {
    const fetchData = async () => {

        const res = await 

    }

    fetchData()
    },[])
    return <form className={ `relative w-full mx-1 md:w-1/3 m-5 text-black md:block ${mobileNavActive ? "block" : "hidden"}` }>
        <input ref={ searchRef } className="basic text-black" type="text" name="search" value={ search } onChange={ (e) => setSearch(e.target.value.toLowerCase().replace(/ /g, "")) } />
        <div onClick={ () => searchRef.current?.focus() } className={ `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black select-none items-center inline-flex ${search ? "opacity-0" : "opacity-30"}` }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span>Search</span>
        </div>
    </form>;
}
