import React, { useEffect, useState } from 'react';
import './StoreList.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import SliderTime from '../../SliderTime/SliderTime';
import StoreCard from '../../components/StoreCard/StoreCard';
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/instance';

function StoreList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleClickStore = (id) => {
    navigate(`/restaurant/${id} `);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/restaurant/');
      setData(res.data);
    };
    fetchData();
  }, []);

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
        {data.length > 0 && data.map((el) => (
          <button onClick={() => handleClickStore(el.id)}>
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
