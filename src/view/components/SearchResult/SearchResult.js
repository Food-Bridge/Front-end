import React, { useState, useEffect } from 'react';
import './SearchResult.scss';
import axiosInstance from '../../../api/instance';
import StoreCard from '../StoreCard/StoreCard';

export default function SearchResult({ searchText }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/search/', {
        params: { search: searchText, page: 1 },
      });

      setData(res.data.results);
    };
    fetchData();
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
