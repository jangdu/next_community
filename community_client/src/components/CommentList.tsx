import React from 'react';
import { Comment, Community } from '@/types';
import useSWR from 'swr';
import Link from 'next/link';
import dayjs from 'dayjs';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface CommentListProps {
  comments: Comment[];
  identifier: string | string[];
  slug: string | string[];
  onClickVoteBtn: any;
}

export default function CommentList({
  identifier,
  slug,
  comments,
  onClickVoteBtn,
}: CommentListProps) {
  return (
    <div className="flex flex-col">
      {comments?.map((comment) => (
        <div className="flex " key={comment.identifier}>
          <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
            {/* 좋아요 */}
            <div
              className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
              onClick={() => onClickVoteBtn(1, comment)}
            >
              {comment.userVote === 1 ? (
                <FaArrowUp className="text-red-500" />
              ) : (
                <FaArrowUp />
              )}
            </div>
            <p className="text-xs font-bold">{comment.voteScore}</p>
            {/* 싫어요 */}
            <div
              className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"
              onClick={() => onClickVoteBtn(-1, comment)}
            >
              {comment.userVote === -1 ? (
                <FaArrowDown className="text-red-500" />
              ) : (
                <FaArrowDown />
              )}
            </div>
          </div>
          <div className="py-2 pr-2">
            <div className="mb-2 text-xs leading-none">
              <Link href={`users/${comment.username}`}>
                <button className="mx-1 font-bold hover:underline">
                  {comment.username}
                </button>
              </Link>
              <span className="text-gray-500">
                {`${comment.voteScore}points | ${dayjs(
                  comment.createdAt,
                ).format('YYYY-MM-DD HH:mm')}`}
              </span>
            </div>
            <p>{comment.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
