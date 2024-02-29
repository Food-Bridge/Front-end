import React from 'react';
import './StoreLikes.scss';

import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import StoreCardList from '../../components/StoreCardList/StoreCardList';

export default function StoreLikes() {
  return (
    <>
      <SearchBar />
      <h1 className='storeLikes-title'>즐겨찾기</h1>
      <CategoryBar />
      <StoreCardList />
    </>
  );
}
