import InputGroup from '@/components/InputGroup';
import { useAuthDispatch, useAuthState } from '@/context/auth';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

export default function SignIn() {
  let router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  if (authenticated) router.push('/');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        '/auth/signin',
        {
          username,
          password,
        },
        { withCredentials: true },
      );

      dispatch('LOGIN', res.data?.user);

      alert('로그인이 완료되었습니다.');

      router.push('/');
    } catch (error: any) {
      console.error(error);
      if ('response' in error && error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({});
      }
    }
  };

  return (
    <div className="flex bg-white h-full">
      <div className="flex flex-col my-auto mx-auto h-fit items-center justify-center">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-4 text-lg font-medium text-center">로그인</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder="Password"
              type="password"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button
              className={`w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border-gray-400 rounded-md`}
            >
              로그인
            </button>
          </form>
          <small className="flex justify-end mt-2 ">
            아직 아이디가 없으신가요?
            <Link href={'/signup'}>
              <button className="ml-1 text-blue-500 uppercase">회원가입</button>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
