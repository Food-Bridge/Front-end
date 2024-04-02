import React, { useState, useEffect } from 'react';
import './StoreLikes.scss';
import axiosInstance from '../../../api/instance';
import SearchBar from '../../components/SearchBar/SearchBar';
import StoreCard from '../../components/StoreCard/StoreCard';
import { useNavigate } from 'react-router-dom';

export default function StoreLikes() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleClickStore = (id) => {
    navigate(`/restaurant/${id} `);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/like/');
      const likedRestaurantIds = res.data.liked_restaurants_ids;

      const response = await axiosInstance.get('/restaurant/');

      const filteredData = likedRestaurantIds.map((id) => {
        return response.data.find((restaurant) => restaurant.id === id);
      });

      setData(filteredData);
    };
    fetchData();
  }, []);

  return (
    <>
      <SearchBar />
      <h1 className='storeLikes-title'>즐겨찾기</h1>
      <div className='storeLikes-store'>
        {data.length > 0 ?
          data.map((el) => (
            <button key={el.id} onClick={() => handleClickStore(el.id)}>
              <StoreCard
                img={el.image}
                className={el.className}
                storeName={el.name}
                minimumPrice={el.minimumOrderPrice}
                deliverPrice={el.delivertyFee}
                storeScore={el.rating}
              />
            </button>
          )):<p className='storeLikes-nothing'>즐겨찾는 매장이 없습니다.</p>}
      </div>
    </>
  );
}
