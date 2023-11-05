import React, { useEffect, useState } from 'react';
import SideBar from '../Sidebar';
import CommunityList from '../community/CommunityList';

export default function Sidebar() {
  return (
    <div className={`sticky top-32`}>
      <h2>프로필</h2>
      <p>여기에 프로필 정보를 넣으세요.</p>
      <div>
        <h2>카테고리</h2>
        <ul>
          <CommunityList />
        </ul>
      </div>
    </div>
  );
}
