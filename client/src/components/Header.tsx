import Link from "next/link";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";

interface HeaderProps {

}

export default function Header({ }: HeaderProps) {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [mobileNavActive, setMobileNavActive] = useState<boolean>(true);
  const isActive = (path: string): boolean => {
    const { pathname } = useRouter();
    if (path === "/" && path === pathname) return true;
    if (pathname.includes(path)) return true;
    return false;
  };

  useEffect(() => {
    setMobileNavActive(false);
  }, []);

  const activeLink = "opacity-100";
  const nonActiveLink = "opacity-60";

  return <nav className={ `w-full bg-main h-16 text-white flex md:items-center ${mobileNavActive ? `h-screen md:h-16 items-start fixed` : "items-center"}` }>
    {/* Start Nav */ }
    <div className="flex justify-between items-start w-full flex-col gap-3 m-3 md:flex-row md:items-center md:mx-auto container">
      <div className="w-full md:flex md:flex-row items-center justify-between flex gap-3">
        <h1 className="text-2xl font-semibold uppercase">V-Network</h1>
        {/* Menu Bars */ }
        <svg onClick={ () => setMobileNavActive((prev) => !prev) } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-7 h-7 md:hidden mx-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
        {/* Menu Bars */ }
      </div>
      <ul className={ `gap-3 flex ${mobileNavActive ? "flex-col md:flex-row" : "hidden md:flex"}` }>
        <li>
          <Link href={ `/` }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={ `w-6 h-6 ${isActive('/') ? activeLink : nonActiveLink}` }>
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          </Link>
        </li>
        <li>
          <Link href={ `/message` }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={ `w-6 h-6 ${isActive('/message') ? activeLink : nonActiveLink}` }>
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
          </Link>
        </li>
        <li>
          <Link href={ `/discover` }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={ `w-6 h-6 ${isActive('/discover') ? activeLink : nonActiveLink}` } stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg></Link>
        </li>
        <li>
          <Link href={ `/notify` }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={ `w-6 h-6 ${isActive('/notify') ? activeLink : nonActiveLink}` }>
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          </Link>
        </li>

        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="group" asChild>
              <span className="flex items-end">
                <span className="select-none">User</span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-5 h-5 relative group-active:rotate-180 group-data-[state=open]:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={ 5 }
              >
                <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-slate-600 hover:text-white">
                  <Link href={ `/profile/${user?._id}` }>Profile</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-slate-600 hover:text-white">
                  Dark Mode
                </DropdownMenu.Item>

                <hr />
                <DropdownMenu.Item onClick={ () => {
                  localStorage.removeItem(`firstLogin`);
                  Cookies.remove("refreshtoken");
                  router.push('/login');
                  dispatch(logout());
                } } className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-slate-600 hover:text-white">
                  Logout
                </DropdownMenu.Item>

                <DropdownMenu.Arrow className="fill-white" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </li>


      </ul>
    </div>


    {/* End Nav */ }

  </nav>;
}
