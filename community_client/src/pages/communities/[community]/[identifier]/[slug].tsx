import { Comment, Post } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import dayjs from 'dayjs';
import CommentInput from '@/components/comment/CommentInput';
import CommentList from '@/components/comment/CommentList';
import Vote from '@/components/Vote';
import CommunityProfile from '@/components/community/CommunityProfile';
import { FaRegCommentAlt } from 'react-icons/fa';
import PostContentBody from '@/components/post/PostContentBody';

export default function PostPage() {
  const router = useRouter();
  const { identifier, community, slug } = router.query;

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

  return (
    <div className="flex max-w-5xl px-4 py-5 mx-auto">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-md p-3 shadow-md lg:px-8 lg:py-8">
          {post && (
            <div className="flex w-full">
              <div className="py-2 px-2 w-full">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex w-full flex-row justify-between items-center text-sm">
                      {post.community && (
                        <CommunityProfile community={post.community} />
                      )}
                      <div className="flex">
                        <p className=" text-gray-400">post by</p>
                        <Link href={`/users/${post.username}`} passHref>
                          <button className="text-violet-400 ms-1 font-semibold hover:underline">
                            {post.username}
                          </button>
                        </Link>
                        <p className="text-gray-400 ms-2">
                          {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
                        </p>
                      </div>
                    </div>
                    <h1 className="text-3xl mt-2 md:mt-10">{post.title}</h1>
                    <p className="my-3 text-base px-3 text-gray-500">
                      {post.description}
                    </p>
                  </div>
                  <div className="right-0 text-center text-xl">
                    <Vote post={post} mutate={postMutate} />
                  </div>
                </div>
                <div className="max-w-3xl mx-auto py-6 border-b">
                  <PostContentBody source={post.body} />
                </div>
                <div className="ms-2 mb-2 mt-4 w-fit flex flex-row items-center gap-1">
                  <div className="mt-1 ms-6">
                    <FaRegCommentAlt />
                  </div>
                  <span>댓글 {comments?.length || 0}개</span>
                </div>
                {identifier && slug && (
                  <div className="flex flex-col w-full">
                    <CommentInput post={post} commentMutate={commentMutate} />
                    {comments && (
                      <CommentList
                        post={post}
                        comments={comments}
                        identifier={identifier}
                        slug={slug}
                        commentMutate={commentMutate}
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
