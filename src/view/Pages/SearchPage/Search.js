// Search 컴포넌트
import React, { useState, useEffect } from 'react';
import './Search.scss';
import axios from 'axios';
import './Search.scss';
import SearchRank from '../../components/SearchRank/SearchRank';
import StoreCard from '../../components/StoreCard/StoreCard';
import SearchBarPlus from '../../components/SearchBar/SearchBarPlus';
import SearchResult from '../../components/SearchResult/SearchResult';

export default function Search() {
  const [rankData, setRankData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [isResult, setIsResult] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    setIsResult(true);
  };

  const handleMoveBack = () => {
    setIsResult(false);
    setSearchText('')
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/search/search-ranking/')
      .then((response) => {
        setRankData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <SearchBarPlus
        handleSearch={handleSearch}
        handleMoveBack={handleMoveBack}
        isResult={isResult}
      />

      {isResult ? (
        <SearchResult searchText={searchText} />
      ) : (
        <div className='search'>
          <div className='search-content'>
            <h1 className='search-title'>인기 검색어</h1>
            <div className='search-popular'>
              {rankData.map((el, index) => {
                return (
                  index < 10 && (
                    <button
                      key={'button_' + index}
                      onClick={() => handleSearch(el.keyword)}
                    >
                      <SearchRank
                        key={'searchRank_' + index}
                        rank={index + 1}
                        text={el.keyword}
                        type='up'
                      />
                    </button>
                  )
                );
              })}
            </div>
            <h1 className='search-title'>실시간 인기 맛집</h1>
            <div className='search-store'>
              {storeData.map((el, index) => {
                return (
                  <StoreCard
                    key={index}
                    img={el.image}
                    className={el.className}
                    storeName={el.name}
                    minimumPrice={el.minimumOrderPrice}
                    deliverPrice={el.deliverPrice}
                    storeScore={el.rating}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
