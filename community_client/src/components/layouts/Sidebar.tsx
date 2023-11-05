import React from 'react';
import CommunityList from '../community/CommunityList';
import Image from 'next/image';
import { FaLocationDot, FaGithub } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className={`sticky top-28`}>
      <div className="flex flex-col pt-6 px-4 my-4 border rounded-md shadow transition-all duration-500 hover:bg-white hover:scale-[103%] hover:border-black">
        <div className="flex flex-row items-center gap-4">
          <Image
            src={
              'https://res.cloudinary.com/dyhnnmhcf/image/upload/v1681745025/profileImage_ny0a9b.jpg'
            }
            alt="profile"
            width={80}
            height={30}
            className="rounded-full shadow-md"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold text-md text-gray-500">장두혁</h2>
            <p className="font-medium text-sm text-gray-500">1999.03</p>
          </div>
        </div>
        <div className="text-gray-500 text-xl my-4 flex flex-col gap-2">
          <p className="text-sm">javascript Developer</p>
          <p className="text-sm mb-1">@jangdu</p>
          <div className="flex flex-row gap-1 items-center">
            <HiOutlineMail />
            <p className="text-sm">jjd0324@gmail.com</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <FaLocationDot />
            <p className="text-sm">Gangnam-gu, Seoul</p>
          </div>
          <Link
            href={'https://github.com/jangdu'}
            target="_blank"
            className="w-fit"
          >
            <div className="flex flex-row gap-1 items-center hover:underline hover:text-black">
              <FaGithub />
              <p className="text-sm">Github</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col py-2 px-4 my-4 border rounded-md shadow transition-all duration-500 hover:bg-white hover:scale-105 hover:border-black">
        <CommunityList />
      </div>
    </div>
  );
}
