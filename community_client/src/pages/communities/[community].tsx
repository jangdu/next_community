import axios from 'axios';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import useSWR from 'swr';

export default function CommunityPage() {
  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  const router = useRouter();

  const communityName = router.query.community;

  const { data: community, error } = useSWR(
    communityName ? `communities/${communityName}` : null,
    fetcher,
  );

  return (
    <div>
      {community && (
        <Fragment>
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
                <div className="h-20 bg-gray-400"></div>
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
        </Fragment>
      )}
    </div>
  );
}
