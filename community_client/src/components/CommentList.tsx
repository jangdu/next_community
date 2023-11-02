import React from 'react';
import { Comment, Community, Post } from '@/types';
import useSWR from 'swr';
import Link from 'next/link';
import dayjs from 'dayjs';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Vote from './Vote';

interface CommentListProps {
  comments: Comment[];
  identifier: string | string[];
  slug: string | string[];
  commentMutate: Function;
  post: Post;
}

export default function CommentList({
  post,
  comments,
  commentMutate,
}: CommentListProps) {
  return (
    <div className="flex flex-col">
      {comments?.map((comment) => (
        <div className="flex " key={comment.identifier}>
          <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
            {/* 좋아요 */}
            <Vote post={post} comment={comment} mutate={commentMutate} />
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
