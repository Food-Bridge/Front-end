import React, { useState, useEffect } from 'react';
import './Search.scss';
import axiosInstance from '../../../api/instance';
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
    setSearchText('');
  };

  useEffect(() => {
    const fetchRank = async () => {
      const res = await axiosInstance.get('/search/search-ranking/');
      setRankData(res.data);
    };
    fetchRank();
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
              {rankData &&
                rankData.map((el, index) => {
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
