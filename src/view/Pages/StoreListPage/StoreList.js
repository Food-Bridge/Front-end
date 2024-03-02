import React, { useEffect, useState } from 'react';
import './StoreList.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import SliderTime from '../../SliderTime/SliderTime';
import StoreCard from '../../components/StoreCard/StoreCard'
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StoreList() {
  const [data, setData] = useState([])
  const navigate = useNavigate();

  const handleClickStore = () => {
    navigate('/store/');
  };

  //   const data = [
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
      .get('http://localhost:8000/restaurant/')
      .then((response) => {
        setData(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  return (
    <div className='StoreList'>
      <div className='storeList-header'>
        <div className='storeList-searchBar'>
          <SearchBar location={'강남구'} />
        </div>
        <div className='storeList-imageSlider'>
          <SliderTime className='storeList-img1' slides={SliderImgData} />
        </div>
        <div className='storeList-menuBar'>
          <MenuBar name={'menuBar-pageLine2'} />
        </div>
      </div>
      <div className='storeList-category'>
        <div className='storeList-categoryComp'>
          <CategoryBar />
        </div>
      </div>
      <div className='storeList-store'>
        {data.map((el, index) => (
          <button onClick={handleClickStore}>
            <StoreCard
              key={el.id}
              img={el.image}
              className={el.className}
              storeName={el.name}
              minimumPrice={el.minimumOrderPrice}
              deliverPrice={el.deliverPrice}
              storeScore={el.rating}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default StoreList;
