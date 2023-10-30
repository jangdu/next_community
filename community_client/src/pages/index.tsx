import CommunityList from '@/components/CommunityList';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <CommunityList />
    </>
  );
}
