import { NavBar } from '@/components/NavBar';
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
      <Head>
        <script
          defer
          src="https://use.fontawesome.com/releases/v6.1.1/js/all.js"
          integrity="sha384-xBXmu0dk1bEoiwd71wOonQLyH+VpgR1XcDH3rtxrLww5ajNTuMvBdL5SOiFZnNdp"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <SWRConfig value={{ fetcher }}>
        <AuthProvider>
          <NavBar />
          <div className={'pt-12 bg-gray-50 min-h-screen'}>
            <div className="max-w-6xl flex flex-row gap-4 mx-auto p-5">
              <div className="md:w-56 hidden md:block min-h-screen">
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
