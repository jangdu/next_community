import { useAuthState } from '@/context/auth';
import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { Post } from '@/types';

interface PostProps {
  post: Post;
  commentMutate: any;
}

export default function CommentInput({ post, commentMutate }: PostProps) {
  const { authenticated, user } = useAuthState();
  const [newComment, setNewComment] = useState('');

  const submitComment = async (e: FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === '') return;

    try {
      await axios.post(`/posts/${post.identifier}/${post.slug}/comments`, {
        body: newComment,
      });

      setNewComment('');
      commentMutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 mb-4 w-full">
      {authenticated && user ? (
        <div className="w-full">
          <div className="my-2 text-sm flex flex-row">
            <Link href={`/users/${user.username}`}>
              <button className="font-semibold text-violet-400 hover:underline">
                {user.username}
              </button>
            </Link>
            <p className="ms-1"> 님 이름으로 댓글 작성</p>
          </div>
          <form onSubmit={submitComment}>
            <textarea
              className="w-full p-3 border border-gray-300 rounded transition hover:border-violet-300 focus:outline-none focus:border-violet-600"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button className="px-3 py-1 text-white bg-violet-300 transition hover:bg-violet-500 rounded">
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
