import React, { useState, useEffect } from 'react';
import './SearchResult.scss';
import axios from 'axios';
import StoreCard from '../../components/StoreCard/StoreCard';
import { useLocation } from 'react-router-dom';
import SearchBarPlus from '../../components/SearchBar/SearchBarPlus';
import CategoryBar from '../../components/CategoryBar/CategoryBar';

export default function SearchResult() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const searchText = location.state.searchText;

  // const data = [
  //   {
  //     className: 'StoreCard',
  //     storeName: 'ooo치킨 oo점',
  //     minimumPrice: '20,000',
  //     deliverPrice: '2,000',
  //     storeScore: '4.5',
  //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVJ7hnsvl92es433v7D4NmnVbfM3s3Lp9ww&usqp=CAU',
  //   },
  //   {
  //     className: 'StoreCard',
  //     name: 'ooo치킨 oo점',
  //     minimumOrderPrice: '20,000',
  //     deliverPrice: '2,000',
  //     rating: '4.5',
  //     image: 'https://images.pexels.com/photos/19144414/pexels-photo-19144414.jpeg',
  //   },
  // ];
  useEffect(() => {
    axios
      .get('http://localhost:8000/search/', {
        params: { searchText: searchText, page: 1 },
      })
      .then((response) => {
        setData(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchText, data]);

  return (
    <>
      <SearchBarPlus />
      <h1 className='searchResult-text'>"{searchText}" 검색결과</h1>
      <CategoryBar />
      <div className='searchResult-store'>
        {data.length === 0 ? (
          <p className='searchResult-none'>검색 결과가 없습니다.</p>
        ) : (
          data.map((el, index) => (
            <StoreCard
              key={index}
              img={el.image}
              className={el.className}
              storeName={el.name}
              minimumPrice={el.minimumOrderPrice}
              deliverPrice={el.deliverPrice}
              storeScore={el.rating}
            />
          ))
        )}
      </div>
    </>
  );
}
