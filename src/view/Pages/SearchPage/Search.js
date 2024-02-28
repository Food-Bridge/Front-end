import React, { useEffect, useState } from 'react';
import './Search.scss';
import axios from 'axios';

import StoreTag from '../../components/StoreTag/StoreTag';
import './Search.scss';
import SearchRank from '../../components/SearchRank/SearchRank';
import StoreCard from '../../components/StoreCard/StoreCard';
import SearchBarPlus from '../../components/SearchBar/SearchBarPlus';

export default function Search() {
  const [rankData, setRankData] = useState([])
  const dataArr = [
    {
      className: 'StoreCard',
      storeName: 'ooo치킨 oo점',
      minimumPrice: '20,000',
      deliverPrice: '2,000',
      storeScore: '4.5',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVJ7hnsvl92es433v7D4NmnVbfM3s3Lp9ww&usqp=CAU',
    },
    {
      className: 'StoreCard',
      storeName: 'ooo치킨 oo점',
      minimumPrice: '20,000',
      deliverPrice: '2,000',
      storeScore: '4.5',
      img: 'https://images.pexels.com/photos/19144414/pexels-photo-19144414.jpeg',
    },
  ];

  useEffect(() => {
    axios
      .get('http://localhost:8000/search/search-ranking')
      .then((response) => {
        setRankData(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rankData]);


  return (
    <div className='search'>
      <SearchBarPlus />
      <div className='search-content'>
        <h1 className='search-title'>최근 검색어</h1>
        <div className='search-recent'>
          <StoreTag tagName='치킨 맛집' />
          <StoreTag tagName='그릭요거트' />
          <StoreTag tagName='족발' />
          <StoreTag tagName='반반치킨' />
        </div>
        <h1 className='search-title'>인기 검색어</h1>
        <div className='search-popular'>
          <SearchRank rank='1' text='그릭요거트' type='up' />
        </div>
        <h1 className='search-title'>실시간 인기 맛집</h1>
        <div className='search-store'>
          {dataArr.map((el) => {
            return (
              <StoreCard
                img={el.img}
                className={el.className}
                storeName={el.storeName}
                minimumPrice={el.minimumPrice}
                deliverPrice={el.deliverPrice}
                storeScore={el.storeScore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
