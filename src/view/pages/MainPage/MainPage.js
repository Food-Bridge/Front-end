import React, { useEffect, useState } from 'react';
import './MainPage.scss';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/instance';
import SearchBar from '../../components/SearchBar/SearchBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import MenuBar from '../../components/MenuBar/MenuBar';
import CommunityCard from '../../components/CommunityCard/CommunityCard';
import PlusInfo from '../../components/PlusInfo/PlusInfo';
import { useSelector } from 'react-redux';
import SellerMain from './SellerMain';
import { selectIsSeller } from '../../../redux/reducers/authSlice';
import coupon1 from '../../../data/CouponData/price1000.png';
import coupon2 from '../../../data/CouponData/usersignup.png';
import main1 from '../../../data/MainImageData/Main1.png';
import main2 from '../../../data/MainImageData/Main2.png';
import main3 from '../../../data/MainImageData/Main3.png';

export default function MainPage() {
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState([]);
  const isSeller = useSelector(selectIsSeller);
  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get('/restaurant/').then((res) => {
        setData(res.data.slice(0, 3));
      });
      await axiosInstance.get('/community/').then((res) => {
        setPostData(res.data.results.slice(0, 2));
      });
    };
    fetchData();
  }, []);

  const SliderData = [main1, main2, main3];

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
            {data.length > 0 ? (
              data.map((store, index) => {
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
                      alt='매장 이미지'
                    />
                  </button>
                );
              })
            ) : (
              <div className='main-nothing'>
                <p>매장이 존재하지 않습니다.</p>
              </div>
            )}
          </div>
          <div className='main-title'>
            <h1 className='main-text'>커뮤니티</h1>
            <PlusInfo
              text='더보기'
              arrow='true'
              onClick={() => {
                navigate('/commu/');
              }}
            />
          </div>
          {postData.length > 0 ? (
            <div className='main-group main-postData'>
              {postData.map((post) => {
                return <CommunityCard key={post.id} post={post} />;
              })}
            </div>
          ) : (
            <div className='main-nothing'>
              <p>게시물이 존재하지 않습니다.</p>
            </div>
          )}
          <div className='main-title'>
            <h1 className='main-text'>할인 쿠폰</h1>
            <PlusInfo text='더보기' arrow='true' onClick={handleClickCoupon} />
          </div>
          <div className='main-group'>
            <img className='main-couponImg' src={coupon1} alt='쿠폰 이미지' />
            <img className='main-couponImg' src={coupon2} alt='쿠폰 이미지' />
          </div>
        </>
      )}
    </div>
  );
}
