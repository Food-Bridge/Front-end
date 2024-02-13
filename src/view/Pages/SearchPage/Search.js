<<<<<<< HEAD
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';


=======
import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

>>>>>>> 774ec86cd3ef3f1d7a8d2d10386811af4aac6b44
import './Search.scss';

import SearchBar from '../../components/SearchBar/SearchBar';
import StoreTag from '../../components/StoreTag/StoreTag';
import './Search.scss';
import SearchRank from '../../components/SearchRank/SearchRank';
import StoreCard from '../../components/StoreCard/StoreCard';

export default function Search() {
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

<<<<<<< HEAD
  const [ searchText, setSearchText ] = useState('');
=======
  const [searchText, setSearchText] = useState('');
>>>>>>> 774ec86cd3ef3f1d7a8d2d10386811af4aac6b44

  const handleClickSearch = (event) => {
    setSearchText(event.target.value);
    console.log(searchText);
  };

  return (
    <div className='search'>
      <SearchBar />
      <div className='search-container'>
<<<<<<< HEAD
 <input
        className='search-input'
        placeholder='검색어를 입력하세요.'
        type='text'
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className='search-button' onClick={handleClickSearch}></button>
      </div>
     
=======
        <input
          className='search-input'
          placeholder='검색어를 입력하세요.'
          type='text'
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className='search-button' onClick={handleClickSearch}></button>
      </div>

>>>>>>> 774ec86cd3ef3f1d7a8d2d10386811af4aac6b44
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
          <SearchRank rank='1' text='그릭요거트' type='up' />{' '}
          <SearchRank rank='2' text='그릭요거트' type='up' />{' '}
          <SearchRank rank='3' text='그릭요거트' type='up' />{' '}
          <SearchRank rank='4' text='그릭요거트' type='up' />{' '}
          <SearchRank rank='5' text='그릭요거트' type='up' />{' '}
          <SearchRank rank='6' text='그릭요거트' type='up' />{' '}
          <SearchRank rank='7' text='그릭요거트' type='up' />{' '}
          <SearchRank rank='8' text='그릭요거트' type='down' />{' '}
          <SearchRank rank='9' text='그릭요거트' type='up' />
          <SearchRank rank='10' text='그릭요거트' />
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
          })}{' '}
        </div>
      </div>
    </div>
  );
}
