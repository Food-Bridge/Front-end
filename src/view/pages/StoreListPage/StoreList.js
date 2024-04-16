import React, { useEffect, useState } from 'react';
import './StoreList.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import StoreCard from '../../components/StoreCard/StoreCard';
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/instance';
import Loading from '../../components/Loading/Loading';
function StoreList() {
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <div className='StoreList'>
      {loading && <Loading />}
      <div className='storeList-header'>
        <div className='storeList-searchBar'>
          <SearchBar />
        </div>
        <div className='storeList-imageSlider'>
          <ImageSlider mini slides={SliderImgData} />
        </div>
        <div className='storeList-menuBar'>
          <MenuBar name={'menuBar-pageLine2'} />
        </div>
      </div>
      <CategoryBar category={category} setCategory={setCategory} />
      <div className='storeList-store'>
        {data.length > 0 ? (
          data.map((el) => (
            <button key={el.id} onClick={() => handleClickStore(el.id)}>
              <StoreCard
                img={el.image}
                className={el.className}
                storeName={el.name}
                minimumPrice={el.minimumOrderPrice}
                deliverPrice={el.deliveryFee}
                storeScore={el.averageRating}
              />
            </button>
          ))
        ) : (
          <p className='storeList-nothing'>
            해당 조건의 매장이 존재하지 않습니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default StoreList;
