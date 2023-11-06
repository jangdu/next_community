import { useAuthDispatch, useAuthState } from '@/context/auth';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

export const NavBar: React.FC = () => {
  const { loading, authenticated } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    axios
      .post('/auth/signout')
      .then(() => {
        dispatch('LOGOUT');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex py-3 inset-x-0 items-center justify-between px-8 bg-gray-100 border-b border-gray-300 shadow-b-lg h-20">
      <span className="text-2xl font-bold text-black">
        <Link href="/">jangduBlog</Link>
      </span>

      <div className="flex items-center gap-3">
        <div className="relative flex items-center bg-white border rounded-md hover:border-gray-400 focus:border-gray-700">
          <FaSearch className="ml-2 text-white-400" />
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-4 bg-transparent rounded h-7 focus:outline-none"
          />
        </div>
        {!loading &&
          (authenticated ? (
            <button
              className="w-20 px-2 mr-2 text-sm text-center text-white bg-gray-400 rounded h-7 transition hover:bg-gray-600"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link href="/signin">
                <button className="w-20 px-2 text-sm text-center text-white bg-gray-400 rounded h-7 transition hover:bg-gray-600">
                  로그인
                </button>
              </Link>
              <Link href="/signup">
                <button className="w-20 px-2 text-sm text-center text-white bg-gray-400 rounded h-7 transition hover:bg-gray-600">
                  회원가입
                </button>
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};
