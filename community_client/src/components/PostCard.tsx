import { Community, Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import Vote from './Vote';

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
            <div className="flex flex-row items-center">
              <Link href={`/communities/${post.communityName}`} passHref>
                <Image
                  src={
                    post.community.imageUrn
                      ? post.community.imageUrn
                      : community!.imageUrn
                  }
                  width={18}
                  height={18}
                  alt="community"
                  className="rounded-full cursor-pointer"
                />
              </Link>
              <Link
                className="flex items-center"
                href={`/communities/${post.communityName}`}
              >
                <button className="mx-2 text-sm font-bold cursor-pointer hover:underline">
                  {post.communityName}
                </button>
                {/* <span className="mx-1 text-sm text-gray-500">▪</span> */}
              </Link>
            </div>
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
        <Link className="mt-4 w-fit" href={post.url}>
          <h1 className=" hover:underline text-lg w-fit font-medium">
            {post.title}
          </h1>
        </Link>
        {post.body && <p className="my-1 text-sm">{post.body}</p>}
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
