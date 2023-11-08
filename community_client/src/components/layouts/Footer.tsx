import React from 'react';
import { FiGithub, FiInstagram } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full flex text-white flex-row justify-between items-center px-10 py-4 bg-slate-500 lg:px-[10%] mx-auto">
      <div>
        <h1 className="text-lg mb-2">@jangdu</h1>
        <p className="flex flex-row items-center gap-1">
          <HiOutlineMail />
          jjd0324@gmail.com
        </p>
      </div>
      <div>
        <div className="flex flex-row gap-4 items-center">
          <Link
            href={'https://github.com/jangdu/'}
            target="_blank"
            className="text-2xl w-fit transition p-1 rounded hover:bg-slate-600"
          >
            <FiGithub />
          </Link>
          <Link
            href={'https://github.com/jangdu/'}
            target="_blank"
            className="text-2xl w-fit transition p-1 rounded hover:bg-slate-600"
          >
            <FiInstagram />
          </Link>
        </div>
      </div>
    </footer>
  );
}
