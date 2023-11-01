import { useAuthState } from '@/context/auth';
import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { Post } from '@/types';

interface PostProps {
  post: Post;
}

export default function CommentInput({ post }: PostProps) {
  const { authenticated, user } = useAuthState();
  const [newComment, setNewComment] = useState('');

  const submitComment = async (e: FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === '') return;

    try {
      await axios.post(`/posts/${post.identifier}/${post.slug}/comments`, {
        body: newComment,
      });

      alert('작성완료!!');

      setNewComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-10 mb-4 w-full">
      {authenticated && user ? (
        <div className="w-full">
          <div className="my-2 text-sm flex flex-row">
            <Link href={`/users/${user.username}`}>
              <button className="font-semibold text-blue-500">
                {user.username}
              </button>
            </Link>
            <p> {' 님'} 이름으로 댓글 작성</p>
          </div>
          <form onSubmit={submitComment}>
            <textarea
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button className="px-3 py-1 text-white bg-gray-500 rounded">
                댓글 작성
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-between px-3 py-4 border-gray-200 rounded">
          <p>
            <Link href={'/signin'}>
              <button className="font-semibold text-blue-500">로그인</button>
            </Link>{' '}
            후 댓글 작성이 가능합니다.
          </p>
        </div>
      )}
    </div>
  );
}
