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
      // router.push('login');
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
    <div>
      <div>
        <div>
          <h1>회원가입</h1>
          <form onSubmit={handleSubmit}>
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
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              회원 가입
            </button>
          </form>
          <small>
            <span>이미 가입하셨나요?</span>
            <Link href="/login">
              <button className="ml-1 text-blue-500 uppercase">로그인</button>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
