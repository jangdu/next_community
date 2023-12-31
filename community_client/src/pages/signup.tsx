import InputGroup from '@/components/InputGroup';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/register', {
        email,
        password,
        username,
      });

      console.log(res);
      alert('회원가입이 완료되었습니다.');
      router.push('signin');
    } catch (error: any) {
      console.log(error);
      if ('response' in error && error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({});
      }
    }
  };

  return (
    <div className="bg-white flex justify-center h-full">
      <div className="flex flex-col items-center my-auto h-fit justify-center p-6">
        <div className="w-10/12 flex flex-col mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium text-center">회원가입</h1>
          <form onSubmit={handleSubmit} className=" flex flex-col gap-2">
            <InputGroup
              placeholder="Email"
              value={email}
              setValue={setEmail}
              error={errors.email}
            />
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
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              회원 가입
            </button>
          </form>
          <small className="flex justify-end mt-2">
            <span>이미 가입하셨나요?</span>
            <Link href="/signin">
              <button className="ml-1 text-blue-500 uppercase">로그인</button>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
