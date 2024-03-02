import React, { useState, useEffect, useRef } from 'react';
import './SearchBarPlus.scss';
import SearchBar from './SearchBar';
import StoreTag from '../StoreTag/StoreTag';

export default function SearchBarPlus({
  handleSearch,
  handleMoveBack,
  isResult,
}) {
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchTextRecord, setSearchTextRecord] = useState([]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchText);
      updateSearchRecord(searchText);
    }
  };

  const updateSearchRecord = (text) => {
    setSearchTextRecord((prevSearchTextRecord) => {
      const updatedRecord = [
        text,
        ...prevSearchTextRecord.filter((item) => item !== text),
      ];
      const trimmedRecord = updatedRecord.slice(0, 4);
      return trimmedRecord;
    });
  };

  const handleClick = () => {
    if (isResult) {
      setSearchText('');
      handleMoveBack();
    }
  };

  return (
    <>
      <div className='search' onClick={handleClick}>
        <SearchBar />
        <div className='search-container'>
          <input
            ref={inputRef}
            className='search-input'
            placeholder='검색어를 입력하세요.'
            type='text'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <button
            className='search-button'
            onClick={() => handleSearch(searchText)}
          ></button>
        </div>
      </div>

      {searchTextRecord.length > 0 && (
        <div className='search-recent'>
          <h1 className='search-title'>최근 검색어</h1>
          <div className='search-recentTag'>
            {searchTextRecord.map((search, index) => (
              <button onClick={() => handleSearch(search)}>
                <StoreTag key={index} tagName={search} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
