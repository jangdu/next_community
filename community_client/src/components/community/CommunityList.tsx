import { useAuthState } from '@/context/auth';
import { Community } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

export default function CommunityList() {
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);

  const { authenticated, user } = useAuthState();

  const address = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/communities/community/ranking`;

  const { data: communityRanking } = useSWR<Community[]>(address, fetcher);

  return (
    <div className="flex flex-col">
      <p className="my-1">Category</p>
      <div className="w-fit text-sm flex ms-2 mt-1">
        <Link
          className="flex flex-row hover:underline text-gray-500 hover:text-black"
          href={`/`}
        >
          <p>ㄴ AllPost</p>
        </Link>
      </div>
      {communityRanking?.map((community) => {
        return (
          <div key={community.name} className="w-fit text-sm flex ms-2 mt-1">
            <Link
              className="hover:underline text-gray-500 hover:text-black flex items-center"
              href={`/communities/${community.name}`}
            >
              <p>ㄴ {community.name}</p>
            </Link>
          </div>
        );
      })}

      {authenticated && user && user.username === 'jangdu' ? (
        <div className="w-full py-6 text-center">
          <Link href={'/communities/create'}>
            <button className="transition px-2 py-1 text-center w-fit text-white bg-violet-400 rounded hover:bg-violet-500">
              +
            </button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
