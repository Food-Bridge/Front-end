import React, { useState, useEffect } from 'react';
import './SearchResult.scss';
import axios from 'axios';
import StoreCard from '../StoreCard/StoreCard';

export default function SearchResult({ searchText }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/search/', {
        params: { search: searchText, page: 1 },
      })
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchText]);

  return (
    <>
      <h1 className='searchResult-text'>"{searchText}" 검색결과</h1>
      <div className='searchResult-store'>
        {data && data.length > 0 ? (
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
        ) : (
          <p className='searchResult-none'>검색 결과가 없습니다.</p>
        )}
      </div>
    </>
  );
}
