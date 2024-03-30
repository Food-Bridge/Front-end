import React, { useEffect, useState } from 'react';

import './MainPage.scss';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/instance';
import SearchBar from '../../components/SearchBar/SearchBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import MenuBar from '../../components/MenuBar/MenuBar';
import CommunityCard from '../../components/CommunityCard/CommunityCard';
import PlusInfo from '../../components/PlusInfo/PlusInfo';
import { MiniPostData } from '../../../data/MiniPostData/MiniPostData';
import { useSelector } from 'react-redux';
import SellerMain from './SellerMain';
import { selectIsSeller } from '../../../redux/reducers/authSlice';
import coupon1 from '../../../data/CouponData/price1000.png'
import coupon2 from '../../../data/CouponData/usersignup.png'

export default function MainPage() {
  const [data, setData] = useState([]);
  const isSeller = useSelector(selectIsSeller);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/restaurant/');
      setData(res.data.slice(0, 3));
    };
    fetchData();
  }, []);

  const SliderData = [
    {
      image:
        'https://images.unsplash.com/photo-1575932444877-5106bee2a599?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      image:
        'https://images.unsplash.com/photo-1627662168781-4345690f0bb3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      image:
        'https://images.unsplash.com/photo-1549759594-0d842f402b4d?q=80&w=949&auto= format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const navigate = useNavigate();

  const handleClickCoupon = () => {
    navigate('/users/coupon/');
  };

  return (
    <div className='main'>
      {isSeller ? (
        <SellerMain />
      ) : (
        <>
          <SearchBar className='main-searchBar' location='강남구' count='1' />
          <div className='main-imageSliderContainer'>
            <ImageSlider className='main-imageSlider' slides={SliderData} />
          </div>

          <MenuBar name='menuBar-pageLine1' />
          <div className='main-title'>
            <h1 className='main-text'>이달의 인기 맛집</h1>
            <PlusInfo
              text='더보기'
              arrow='true'
              onClick={() => {
                navigate('/restaurant/');
              }}
            />
          </div>

          <div className='main-group'>
            {data.map((store, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    navigate(`/restaurant/${store.id}`);
                  }}
                >
                  <img
                    className='main-storeImg'
                    src={store.image}
                    alt='인기 맛집'
                  />
                </button>
              );
            })}
          </div>
          <div className='main-title'>
            <h1 className='main-text'>인기 글</h1>
            <PlusInfo
              text='더보기'
              arrow='true'
              onClick={() => {
                navigate('/commuPostWeek/');
              }}
            />
          </div>
          <div className='main-group'>
            {MiniPostData.map((el, index) => {
              return (
                <CommunityCard
                  key={index}
                  user={el.user}
                  location={el.location}
                  img={el.img}
                  text={el.text}
                  className={el.className}
                />
              );
            })}
          </div>
          <div className='main-title'>
            <h1 className='main-text'>할인 쿠폰</h1>
            <PlusInfo text='더보기' arrow='true' onClick={handleClickCoupon} />
          </div>
          <div className='main-group'>
            <img
              className='main-couponImg'
              src={coupon1}
            />
            <img
              className='main-couponImg'
              src={coupon2}
            />
          </div>
        </>
      )}
    </div>
  );
}
