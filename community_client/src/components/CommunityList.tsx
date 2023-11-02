import { useAuthState } from '@/context/auth';
import { Community } from '@/types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

export default function CommunityList() {
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);

  const { authenticated } = useAuthState();

  const address = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/communities/community/ranking`;

  const { data: communityRanking } = useSWR<Community[]>(address, fetcher);

  return (
    <div className="hidden w-4/12 bg-white h-fit p-2 ml-3 rounded-md md:block">
      <div className="p-4 border-b mb-4">
        <p className="text-lg font-semibold text-center">커뮤니티</p>
      </div>

      <div className="flex flex-row">
        {communityRanking?.map((community) => {
          return (
            <div
              key={community.name}
              className="flex flex-row ms-2 gap-2 p-4 border-b mb-4 w-full"
            >
              <Link href={`/communities/${community.name}`}>
                <Image
                  src={community.imageUrn}
                  alt="community"
                  width={25}
                  height={25}
                  className="rounded-full cursor-pointer"
                />
              </Link>
              <Link
                className="hover:underline"
                href={`/communities/${community.name}`}
              >
                <p>{community.name}</p>
              </Link>
            </div>
          );
        })}
      </div>

      {authenticated && (
        <div className="w-full py-6 text-center">
          <Link href={'/communities/create'}>
            <button className=" p-2 text-center w-fit text-white bg-gray-400 rounded hover:bg-black">
              커뮤니티 만들기
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
