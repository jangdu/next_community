import { Post } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import dayjs from 'dayjs';

export default function PostPage() {
  const router = useRouter();
  const { identifier, community, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
    identifier && community ? `/posts/${identifier}/${slug}` : null,
  );

  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      <div className="w-full md:mr-4 md:w-8/12">
        <div className="bg-white rounded">
          {post && (
            <div className="flex">
              <div className="py-2 px-2">
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
                <div className="flex">
                  <button>
                    <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                    <span className="font-medium">
                      {post.commentCount} Comments
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
