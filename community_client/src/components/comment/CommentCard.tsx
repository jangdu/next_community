import React from 'react';
import Vote from '../Vote';
import { Comment, Post } from '@/types';
import Link from 'next/link';
import dayjs from 'dayjs';

interface CommentCardProps {
  comment: Comment;
  post: Post;
  commentMutate: Function;
}

export default function CommentCard({
  comment,
  post,
  commentMutate,
}: CommentCardProps) {
  return (
    <div className="flex border-b py-3" key={comment.identifier}>
      <Vote post={post} comment={comment} mutate={commentMutate} />
      <div className="flex p-2 h-full">
        <div className=" flex flex-col ">
          <div className="mb-2 text-xs leading-none flex flex-row">
            <Link href={`users/${comment.username}`}>
              <button className="mx-1 font-bold hover:underline">
                {comment.username}
              </button>
            </Link>
            <span className="text-gray-500">
              {`${dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}`}
            </span>
          </div>
          <p>{comment.body}</p>
        </div>
      </div>
    </div>
  );
}
