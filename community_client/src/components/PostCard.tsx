import { useAuthState } from '@/context/auth';
import { Comment, Community, Post } from '@/types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import dayjs from 'dayjs';

interface PostCardProps {
  post: Post;
  community: Community;
  communityMutate: any;
  isInCommunityPage: boolean;
}

export default function PostCard({
  post,
  communityMutate,
  isInCommunityPage,
  community,
}: PostCardProps) {
  const router = useRouter();
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
      communityMutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mb-4 bg-white rounded" id={post.identifier}>
      {/* 투표 기능 */}
      <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
        <div
          className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
          onClick={() => onClickVoteBtn(1)}
        >
          {post.userVote === 1 ? (
            <FaArrowUp className="text-red-500" />
          ) : (
            <FaArrowUp />
          )}
        </div>
        <p className="text-xs font-bold">{post.voteScore}</p>
        <div
          className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"
          onClick={() => onClickVoteBtn(-1)}
        >
          {post.userVote === -1 ? (
            <FaArrowDown className="text-blue-500" />
          ) : (
            <FaArrowDown />
          )}
        </div>
      </div>

      {/* { 포스트 } */}
      <div className="w-full p-3 flex flex-col">
        <div className="flex flex-row items-center">
          {!isInCommunityPage && (
            <div className="flex flex-row items-center">
              <Link href={`/communities/${post.communityName}`} passHref>
                <Image
                  src={community.imageUrn}
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
                <button className="ms-2 text-sm font-bold cursor-pointer hover:underline">
                  {post.communityName}
                </button>
                <span className="mx-1 text-sm text-gray-400">|</span>
              </Link>
            </div>
          )}
          <div className="flex flex-row justify-between items-center text-sm text-gray-500">
            <p>post by</p>
            <Link href={`users/${post.username}`} passHref>
              <button className="text-blue-400 mx-1 hover:underline">
                {post.username}
              </button>
            </Link>
            <p className="mx-1">
              {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
            </p>
          </div>
        </div>
        <Link className="w-fit" href={post.url}>
          <h1 className="my-1 text-lg w-fit font-medium">{post.title}</h1>
        </Link>
        {post.body && <p className="my-1 text-sm">{post.body}</p>}
        <Link
          className="ms-2 my-2 flex flex-row items-center gap-1"
          href={post.url}
        >
          <i className="mr-1 fas fa-comment-alt fa-xs"></i>
          <span>{post.commentCount || 0}</span>
        </Link>
      </div>
    </div>
  );
}
