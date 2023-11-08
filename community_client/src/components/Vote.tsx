import { useAuthState } from '@/context/auth';
import { Comment, Post } from '@/types';
import axios from 'axios';
import React from 'react';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';

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
    <div className="flex flex-row w-20 mx-2 my-1 items-center text-center rounded-l">
      <div
        className="flex justify-center w-6 mx-auto py-1 font-bold rounded cursor-pointer transition hover:scale-125 hover:bg-gray-200"
        onClick={() => onClickVoteBtn(1, comment)}
      >
        {!comment && (
          <BsHandThumbsUp
            className={post.userVote === 1 ? 'text-red-600' : ''}
          />
        )}
        {comment && (
          <BsHandThumbsUp
            className={comment.userVote === 1 ? 'text-red-600' : ''}
          />
        )}
      </div>
      <p className="text-xs font-bold my-2">
        {comment ? comment.voteScore : post.voteScore}
      </p>
      <div
        className="flex justify-center w-6 py-1 mx-auto font-bold rounded cursor-pointer transition hover:scale-125 hover:bg-gray-200"
        onClick={() => onClickVoteBtn(-1, comment)}
      >
        {!comment && (
          <BsHandThumbsDown
            className={post.userVote === -1 ? 'text-blue-600' : ''}
          />
        )}
        {comment && (
          <BsHandThumbsDown
            className={comment.userVote === -1 ? 'text-blue-500' : ''}
          />
        )}
      </div>
    </div>
  );
}
