import Link from 'next/link';
import React from 'react';
import { useAuthState } from '../context/auth';
import { Community } from '../types';
import dayjs from 'dayjs';
type Props = {
  community: Community;
};

const SideBar = ({ community }: Props) => {
  const { authenticated } = useAuthState();
  return (
    <div className="hidden w-4/12 ml-3 md:block">
      <div className="bg-white border rounded-md shadow-md">
        <div className="p-3 bg-violet-400 rounded-t">
          <p className="font-semibold text-white">
            {community.name}의 상세정보
          </p>
        </div>
        <div className="p-3">
          <p className="mb-3 text-base">{community?.description}</p>
          <div className="flex text-sm text-gray-500">
            <Link href={`users/${community.username}`} passHref>
              <button className="text-violet-400 hover:underline">
                {community.username}
              </button>
            </Link>
            <p>님의 커뮤니티</p>
          </div>
          <p className="my-3 text-sm text-gray-500">
            {dayjs(community?.createdAt).format('YYYY.MM.DD')} ~
          </p>

          {authenticated && (
            <div className="flex justify-end my-2">
              <Link href={`/communities/${community.name}/createPost`}>
                <button className="p-2 text-sm text-white bg-violet-400 hover:bg-violet-500 transition rounded">
                  포스트 생성
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
