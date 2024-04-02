import React, { useEffect, useState } from 'react';
import './StoreList.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import SliderTime from '../../components/SliderTime/SliderTime';
import StoreCard from '../../components/StoreCard/StoreCard';
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/instance';

function StoreList() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(0);
  const navigate = useNavigate();
  const handleClickStore = (id) => {
    navigate(`/restaurant/${id} `);
  };

  let url = category ? `/search/category/?search=${category}` : '/restaurant/';

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(url);
      category ? setData(res.data.results) : setData(res.data);
    };
    fetchData();
  }, [url]);

  return (
    <div className='StoreList'>
      <div className='storeList-header'>
        <div className='storeList-searchBar'>
          <SearchBar />
        </div>
        <div className='storeList-imageSlider'>
          <SliderTime className='storeList-img1' slides={SliderImgData} />
        </div>
        <div className='storeList-menuBar'>
          <MenuBar name={'menuBar-pageLine2'} />
        </div>
      </div>
      <CategoryBar setCategory={setCategory} />
      <div className='storeList-store'>
        {data.length > 0 &&
          data.map((el) => (
            <button key={el.id} onClick={() => handleClickStore(el.id)}>
              <StoreCard
                img={el.image}
                className={el.className}
                storeName={el.name}
                minimumPrice={el.minimumOrderPrice}
                deliverPrice={el.delivertyFee}
                storeScore={el.averageRating}
              />
            </button>
          ))}
      </div>
    </div>
  );
}

export default StoreList;
