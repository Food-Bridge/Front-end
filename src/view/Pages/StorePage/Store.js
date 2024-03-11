import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/instance.js';

import './Store.scss';
import StoreDeliverTogo from '../../components/StoreDeliverTogo/StoreDeliverTogo.js';
import MenuBlock from '../../components/MenuBlock/MenuBlock.js';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';
import SearchBar from '../../components/SearchBar/SearchBar'
import PlusInfo from '../../components/PlusInfo/PlusInfo.js';
import RateStars from '../../components/RateStars/RateStars.js';

import { CiPhone } from 'react-icons/ci';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';



export default function Store({ count }) {
  const { resId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/restaurant/${resId}`);
      const menuRes = await axiosInstance.get(`/restaurant/${resId}/menu`);
      setData(res.data);
      setSliderData(res.data.image);
      setMenuData(menuRes.data);
      console.log(menuRes);
    };
    fetchData();
  }, []);

  const handleClickOption = (menuId) => {
    navigate(`${menuId}/`);
  };

  const handleOpenReview = () => {
    navigate('review/');
  };

  const showNumber = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  const pressLike = () => {
    setIsLike(!isLike);
  };

  return (
    <div className='store'>
      <SearchBar />
      <div className='store-img'>
        {sliderData && sliderData.length > 0 ? (
          <ImageSlider slides={[sliderData]} />
        ) : (
          ''
        )}
      </div>
      <div className='store-main'>
        <div className='store-title'>
          <h1 className='store-name'>{data.name}</h1>
          <div className='store-icon'>
            <button className='store-phone' onClick={showNumber}>
              <CiPhone size='30' />
            </button>
            <button className='store-like ' onClick={pressLike}>
              {isLike ? (
                <IoIosHeart size='30' color='red' />
              ) : (
                <IoIosHeartEmpty size='30' color='red' />
              )}
            </button>
          </div>
        </div>
        <div className='store-rate'>
          <RateStars rate={data.rating} />
        </div>
        <div className='store-detailContainer'>
          <div className='store-detail'>
            <h2 className='store-detailText'>찜</h2>
            <p className='store-detailNum'>{data.bookmarkCount}</p>
            <h2 className='store-detailText'>리뷰</h2>
            <p className='store-detailNum'>{data.reviewCount}</p>
            <PlusInfo text='더보기' arrow='true' onClick={handleOpenReview} />
          </div>
          {showPhoneNumber && (
            <div className='store-popup'>
              <p className='store-popupText'> {data.phone_number}</p>
            </div>
          )}
        </div>
      </div>

      <StoreDeliverTogo data={data} />
      <div className='store-menu'>
        <h2 className='store-menuTitle'>메뉴</h2>
        <div className='store-menuBlocks'>
          {menuData.map((el) => (
            <div
              className='store-menuBlock'
              key={el.id}
              onClick={() => handleClickOption(el.id)}
            >
              <MenuBlock
                title={el.name}
                price={el.price}
                image={el.image}
                content={el.content}
                popular={el.is_popular}
                main={el.is_main}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
