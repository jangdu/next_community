import LoadingUi from '@/components/LoadingUi';
import PostCard from '@/components/PostCard';
import SkeletonUi from '@/components/ui/SkeletonUi';
import { Post } from '@/types';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

import useSWRInfinite from 'swr/infinite';

export default function Home() {
  const [postObserver, setPostObserver] = useState('');

  const getKey = (pageIndex: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/posts?page=${pageIndex}`;
  };

  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    isLoading,
    mutate: allPostsMutate,
  } = useSWRInfinite<Post[]>(getKey);

  const isInitialLoading = !data && !error;
  const posts: Post[] = data ? ([] as Post[]).concat(...data) : [];

  useEffect(() => {
    if (!posts || posts.length === 0) {
      return;
    }

    const postId = posts[posts.length - 1].identifier;

    if (postId !== postObserver) {
      setPostObserver(postId);
      observeElement(document.getElementById(postId));
    }
  }, [posts]);

  const observeElement = (e: HTMLElement | null) => {
    if (!e) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log('new post');
          setPage(page + 1);
          observer.unobserve(e);
        }
      },
      { threshold: 1 },
    );
    observer.observe(e);
  };

  return (
    <div className="flex w-full mx-auto">
      {/* allPostList */}
      <div className="w-full mx-auto">
        <h1 className="text-xl p-2 my-2 font-semibold text-black">All Posts</h1>
        {(isInitialLoading || isLoading) && <SkeletonUi />}
        {posts?.map((post) => (
          <div key={post.identifier} id={post.identifier}>
            <PostCard
              isInCommunityPage={false}
              post={post}
              mutate={allPostsMutate}
            />
          </div>
        ))}
        {isValidating && posts.length > 0 && <SkeletonUi />}
      </div>
    </div>
  );
}
