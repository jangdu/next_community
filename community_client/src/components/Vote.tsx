import { useAuthState } from '@/context/auth';
import { Comment, Post } from '@/types';
import axios from 'axios';
import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface VoteProps {
  post: Post;
  mutate: Function;
  comment?: Comment;
}

export default function Vote({ post, comment, mutate }: VoteProps) {
  const { authenticated } = useAuthState();

  const onClickVoteBtn = async (value: number, comment?: Comment) => {
    if (!authenticated) {
      alert('로그인 후 이용이 가능합니다!');
    }

    if (
      (!comment && value === post?.userVote) ||
      (comment && comment.userVote === value)
    ) {
      value = 0;
    }

    try {
      await axios.post('/votes', {
        identifier: post.identifier,
        slug: post.slug,
        commentIdentifier: comment?.identifier,
        value,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-shrink-0 w-10 mx-2 my-auto text-center rounded-l">
      <div
        className="flex justify-center w-6 mx-auto py-1 text-gray-500 rounded cursor-pointer transition hover:bg-violet-300"
        onClick={() => onClickVoteBtn(1, comment)}
      >
        {!comment && (
          <FaArrowUp className={post.userVote === 1 ? 'text-red-600' : ''} />
        )}
        {comment && (
          <FaArrowUp className={comment.userVote === 1 ? 'text-red-600' : ''} />
        )}
      </div>
      <p className="text-xs font-bold my-2">
        {comment ? comment.voteScore : post.voteScore}
      </p>
      <div
        className="flex justify-center w-6 py-1 mx-auto text-gray-500 rounded cursor-pointer transition hover:bg-violet-300"
        onClick={() => onClickVoteBtn(-1, comment)}
      >
        {!comment && (
          <FaArrowDown
            className={post.userVote === -1 ? 'text-blue-600' : ''}
          />
        )}
        {comment && (
          <FaArrowDown
            className={comment.userVote === -1 ? 'text-blue-600' : ''}
          />
        )}
      </div>
    </div>
  );
}
