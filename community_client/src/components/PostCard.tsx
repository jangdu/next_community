import { Community, Post } from '@/types';
import Link from 'next/link';
import React from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import Vote from './Vote';
import CommunityProfile from './community/CommunityProfile';

interface PostCardProps {
  post: Post;
  community?: Community;
  mutate: any;
  isInCommunityPage: boolean;
}

export default function PostCard({
  post,
  mutate,
  isInCommunityPage,
  community,
}: PostCardProps) {
  return (
    <div
      className="flex mb-4 bg-white rounded-lg shadow-md overflow-hidden"
      id={post.identifier}
    >
      {/* 투표 기능 */}
      <div className="flex bg-violet-200">
        <Vote post={post} mutate={mutate} />
      </div>
      {/* { 포스트 } */}
      <div className="w-full p-3 flex flex-col">
        <div className="flex flex-row justify-between items-center">
          {!isInCommunityPage && post.community && (
            <CommunityProfile community={post.community} />
          )}
          <div className="flex flex-row items-center text-sm text-gray-500">
            <p>post by</p>
            <Link href={`users/${post.username}`} passHref>
              <button className="text-violet-400 mx-1 hover:underline">
                {post.username}
              </button>
            </Link>
            <p className="ms-1">
              {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
            </p>
          </div>
        </div>
        <Link className="mt-4 mb-2 w-fit" href={post.url}>
          <h1 className=" hover:underline text-xl w-fit font-medium">
            {post.title}
          </h1>
        </Link>
        {post.description && <p className="my-1 text-sm">{post.description}</p>}
        <Link
          className="ms-2 mb-2 mt-4 w-fit flex flex-row items-center gap-1 hover:text-gray-500"
          href={post.url}
        >
          <div className="mt-[3.2px] mr-1">
            <FaRegCommentAlt />
          </div>
          <span>댓글 {post.commentCount || 0}</span>
        </Link>
      </div>
    </div>
  );
}
