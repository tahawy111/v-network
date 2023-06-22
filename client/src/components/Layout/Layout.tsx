import { setUser } from '@/redux/features/auth';
import { startLoading, stopLoading } from '@/redux/features/global';
import { AppDispatch, RootState } from '@/redux/store';
import { getError } from '@/lib/getError';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { useRouter } from 'next/router';
import { getPosts } from '@/redux/features/post';
import io from "socket.io-client";

interface LayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const { access_token } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const firstLogin = localStorage.getItem("firstLogin");
                if (firstLogin === "true") {
                    const { data } = await axios.get(`${process.env.API}/api/auth/refresh_token`, { withCredentials: true });
                    dispatch(setUser(data));
                }
            } catch (error) {
                localStorage.removeItem("firstLogin");
                Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
                router.push("/login");
            }
        };

        fetchData();

    }, [dispatch]);

    useEffect(() => {
        access_token && dispatch(getPosts({ access_token, page: 1 }));
    }, [dispatch, access_token]);

    useEffect(() => {
        const socket = io();
        return () => { socket.close(); };
    }, []);


    return <div>
        {
            <>
                { access_token && <Header /> }
                <div className='container mx-auto'>
                    { children }
                </div>
            </>
        }
    </div>;
};

export default Layout;