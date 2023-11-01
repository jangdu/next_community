import { Comment, Post } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import dayjs from 'dayjs';
import CommentInput from '@/components/CommentInput';
import CommentList from '@/components/CommentList';
import { useAuthState } from '@/context/auth';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function PostPage() {
  const router = useRouter();
  const { identifier, community, slug } = router.query;
  const { authenticated } = useAuthState();

  const {
    data: post,
    error,
    mutate: postMutate,
  } = useSWR<Post>(
    identifier && community ? `/posts/${identifier}/${slug}` : null,
  );

  const { data: comments, mutate: commentMutate } = useSWR<Comment[]>(
    identifier && slug ? `/posts/${identifier}/${slug}/comments` : null,
  );

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
        identifier,
        slug,
        commentIdentifier: comment?.identifier,
        value,
      });
      postMutate();
      commentMutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      <div className="w-full md:mr-4 md:w-[70%]">
        <div className="bg-white rounded">
          {post && (
            <div className="flex">
              <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
                {/* 좋아요 */}
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
                {/* 싫어요 */}
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
              <div className="py-2 px-2 w-full">
                <div className="flex items-center">
                  <p className="flex flex-row gap-2 text-sm text-gray-400">
                    <Link href={`/users/${post.username}`}>
                      <button className="hover:text-black">
                        {post.username}
                      </button>
                    </Link>

                    <Link href={`${post.url}`}>
                      <button className="hover:text-black">
                        {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
                      </button>
                    </Link>
                  </p>
                </div>
                <h1 className="my-1 text-xl font-medium">{post.title}</h1>
                <p className="my-3 text-base">{post.body}</p>
                <div className="flex items-center">
                  <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                  <span className="font-medium">
                    {post.commentCount} Comments
                  </span>
                </div>
                {identifier && slug && (
                  <div className="flex flex-col w-full">
                    <CommentInput post={post} commentMutate={commentMutate} />
                    {comments && (
                      <CommentList
                        comments={comments}
                        identifier={identifier}
                        slug={slug}
                        onClickVoteBtn={onClickVoteBtn}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
