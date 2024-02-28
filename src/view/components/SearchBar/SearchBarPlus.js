import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SearchBarPlus.scss';
import SearchBar from './SearchBar';

export default function SearchBarPlus() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      navigate('/search/result/', { state: { searchText: searchText } });
      setSearchText('');
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return(
    <>
      <SearchBar />
      <div className='search-container'>
        <input
          className='search-input'
          placeholder='검색어를 입력하세요.'
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button className='search-button' onClick={handleSearch}></button>
      </div>
    </>
  );
}
