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
    <div className="flex flex-col mb-2" id={post.identifier}>
      {/* { 포스트 } */}
      <div className="w-full p-3 flex flex-col rounded-lg overflow-hidden ">
        <div className="flex flex-row justify-between items-center">
          {!isInCommunityPage && post.community && (
            <CommunityProfile community={post.community} />
          )}
          <div className="flex flex-row items-center text-sm text-gray-500">
            <p>post by</p>
            <Link href={`users/${post.username}`} passHref>
              <button className="text-blue-400 mx-1 hover:underline">
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
        <div className="flex flex-row items-center">
          <Link
            className="ms-2 w-fit flex flex-row items-center gap-1 transition rounded px-2 py-1 hover:bg-gray-200"
            href={post.url}
          >
            <div className="mt-[3.2px] mr-1">
              <FaRegCommentAlt />
            </div>
            <span>댓글 {post.commentCount || 0}</span>
          </Link>
          <Vote post={post} mutate={mutate} />
        </div>
      </div>
      <div className="border border-gray-300 w-full mt-2"></div>
    </div>
  );
}
