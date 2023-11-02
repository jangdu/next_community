import { Post } from '@/types';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const router = useRouter();
  const { community: communityName } = router.query;

  const submitPost = async (e: FormEvent) => {
    e.preventDefault();

    console.log(body);

    if (title.trim() === '' || !communityName)
      return alert('타이틀을 입력해주세요');

    try {
      const { data: post } = await axios.post<Post>('/posts', {
        title: title.trim(),
        body,
        community: communityName,
      });

      console.log(post);

      router.push(
        `/communities/${communityName}/${post.identifier}/${post.slug}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center pt16">
      <div className="w-10/12 mx-auto md:w-96">
        <div className="p-4 bgwhite rounded">
          <h1 className="mb-3 text-lg">포스트 생성 페이지</h1>
          <form onSubmit={submitPost}>
            <div className="relative mb-2">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:bg-blue-300"
                placeholder="Title"
                maxLength={20}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div
                style={{ top: 10, right: 10 }}
                className="absolute mb-2 text-sm text-gray-500 select-none"
              >
                {title.trim().length}/20
              </div>
            </div>
            <textarea
              rows={4}
              placeholder="포스트 내용"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:bg-blue-300"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-sm font-semibold text-white bg-gray-400 border rounded"
                disabled={title.trim().length === 0}
              >
                글 생성하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error('쿠키에 로그인된 토큰이 없습니다.');

    await axios.get('/auth/me', { headers: { cookie } });

    return { props: {} };
  } catch (error) {
    res.writeHead(307, { Location: '/signin' }).end();
    return { props: {} };
  }
};
