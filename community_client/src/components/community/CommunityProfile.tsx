import { Community } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CommunityProfileProps {
  community: Community;
}

export default function CommunityProfile({ community }: CommunityProfileProps) {
  return (
    <div className="flex flex-row items-center">
      <Link
        className="flex items-center"
        href={`/communities/${community.name}`}
      >
        <button className="mx-2 text-sm font-semibold text-gray-500 cursor-pointer hover:underline">
          @{community.name}
        </button>
      </Link>
    </div>
  );
}
