import React from 'react';
import { Comment, Community } from '@/types';
import useSWR from 'swr';
import Link from 'next/link';
import dayjs from 'dayjs';

interface CommentListProps {
  comments: Comment[];
  identifier: string | string[];
  slug: string | string[];
}

export default function CommentList({
  identifier,
  slug,
  comments,
}: CommentListProps) {
  return (
    <div className="flex flex-col">
      {comments?.map((comment) => (
        <div className="flex " key={comment.identifier}>
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
