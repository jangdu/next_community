import PostCard from '@/components/PostCard';
import SideBar from '@/components/Sidebar';
import { useAuthState } from '@/context/auth';
import { Post } from '@/types';
import axios from 'axios';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import useSWR from 'swr';

export default function CommunityPage() {
  const [isCommunityOwner, setIsCommunityOwner] = useState(false);
  const { authenticated, user } = useAuthState();

  const router = useRouter();

  const communityName = router.query.community;

  const {
    data: community,
    error,
    mutate: communityMutate,
  } = useSWR(communityName ? `communities/${communityName}` : null);

  const isInCommunityPage = router.pathname === `'communities/[community]`;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileInput = (type: string) => {
    if (!isCommunityOwner) return;
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.name = type;
      fileInput.click();
    }
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileInputRef.current!.name);

    try {
      await axios.post(`/communities/${community.name}/upload`, formData, {
        headers: { 'Content-Type': 'mulipart/form-data' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!community) return;
    setIsCommunityOwner(authenticated && user?.username === community.username);
  }, [community]);

  let renderPosts;

  if (!community) {
    renderPosts = <p className="text-lg text-center">로딩중...</p>;
  } else if (community.posts.length === 0) {
    renderPosts = (
      <p className="text-lg text-center">아직 작성된 포스트가 없습니다.</p>
    );
  } else {
    renderPosts = community.posts.map((post: Post) => (
      <PostCard
        key={post.identifier}
        post={post}
        communityMutate={communityMutate}
        isInCommunityPage={isInCommunityPage}
        community={community}
      />
    ));
  }

  return (
    <div>
      {community && (
        <Fragment>
          <input
            type="file"
            hidden={true}
            ref={fileInputRef}
            onChange={uploadImage}
          />
          <div>
            <div className={classNames('bg-gray-400')}>
              {community.bannerUrn ? (
                <div
                  className="h-56"
                  style={{
                    backgroundImage: `url(${community.bannerUrn})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  onClick={() => openFileInput('banner')}
                ></div>
              ) : (
                <div
                  className="h-20 bg-gray-400"
                  onClick={() => openFileInput('banner')}
                ></div>
              )}
            </div>
          </div>
          <div className="h-20 bg-white">
            <div className="relative flex max-w-5xl px-5 mx-auto">
              <div className="absolute" style={{ top: -15 }}>
                {community.imageUrn && (
                  <Image
                    src={community.imageUrn}
                    alt=""
                    width={70}
                    height={70}
                    onClick={() => openFileInput('image')}
                    className={classNames('rounded-full')}
                  />
                )}
              </div>
              <div className="pt-1 pl-24">
                <div className="flex items-center">
                  <h1 className="mb-1 text-3xl font-bold">{community.title}</h1>
                </div>
                <p>communities/{community.name}</p>
              </div>
            </div>
            <div className="flex max-w-5xl px-4 pt-5 mx-auto"></div>
          </div>
          <div className="flex max-w-5xl px-4 pt-5 mx-auto">
            <div className="w-full md:mr-3 md:w-8/12">{renderPosts}</div>
            <SideBar community={community} />
          </div>
        </Fragment>
      )}
    </div>
  );
}
