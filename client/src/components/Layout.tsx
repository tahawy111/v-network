import { setUser } from '@/features/auth/authSlice';
import { startLoading, stopLoading } from '@/features/global/global';
import { AppDispatch } from '@/features/store';
import { getError } from '@/lib/getError';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';

interface LayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
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
                // localStorage.removeItem("firstLogin");
                // Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
            }
        };

        fetchData();
    }, [dispatch]);

    return <div>
        <Header />
        { children }</div>;
};

export default Layout;