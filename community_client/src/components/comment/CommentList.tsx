import React from 'react';
import { Comment, Post } from '@/types';
import CommentCard from './CommentCard';

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
        <CommentCard
          comment={comment}
          commentMutate={commentMutate}
          post={post}
          key={comment.identifier}
        />
      ))}
    </div>
  );
}
