import { NavBar } from '@/components/layouts/NavBar';
import Sidebar from '@/components/layouts/Sidebar';
import { AuthProvider } from '@/context/auth';
import '@/styles/globals.css';
import axios from 'axios';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api';
  axios.defaults.withCredentials = true;

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login'];
  const authRoute = authRoutes.includes(pathname);

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <AuthProvider>
          <div className={'bg-gray-100 min-h-screen'}>
            <NavBar />
            <div className="max-w-6xl flex flex-row gap-4 mx-auto px-4">
              <div className="md:w-56 hidden md:block">
                <Sidebar />
              </div>
              <div className="md:w-10/12 w-full mx-auto">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </AuthProvider>
      </SWRConfig>
    </>
  );
}
