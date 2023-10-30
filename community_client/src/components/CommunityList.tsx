import { Community } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

export default function CommunityList() {
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);

  const address = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/communities/community/ranking`;

  const { data: communityRanking } = useSWR<Community[]>(address, fetcher);

  return (
    <div className="flex max-w-5xl px-4 mx-auto">
      <div className="w-full md:mr-3 md:w-8/12">
        <div className="hidden w-4/12 ml-3 md:block">
          <div className="p-4 border-b">
            <p className="text-lg font-semibold text-center">상위 커뮤니티</p>
          </div>

          <div></div>

          <div className="w-full py-6 text-center">
            <Link href={'/communities/create'}>
              <button className="w-full p-2 text-center text-white bg-gray-400 rounded">
                커뮤니티 만들기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
