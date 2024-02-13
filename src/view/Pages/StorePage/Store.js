<<<<<<< HEAD
import { useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 774ec86cd3ef3f1d7a8d2d10386811af4aac6b44

import './Store.scss';
import StoreDeliverTogo from '../../components/StoreDeliverTogo/StoreDeliverTogo.js';
import MenuBlock from '../../components/MenuBlock/MenuBlock.js';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';

import { CiPhone } from 'react-icons/ci';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

import { FaStar, FaStarHalf } from 'react-icons/fa';
import PlusInfo from '../../components/PlusInfo/PlusInfo.js';
import Basket from '../../components/Basket/Basket.js';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

export default function Store({ count }) {
  const navigate = useNavigate()

  const handleClickOption = () => {
    navigate('/option/')
  }

=======

export default function Store({ count }) {
>>>>>>> 774ec86cd3ef3f1d7a8d2d10386811af4aac6b44
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

  function roundRates(number) {
    return Math.round(number * 2) / 2;
  }
  const rate = roundRates(4.72);
  let rateStars;
  if (rate % 1 === 0) {
    rateStars = Array(rate).fill(<FaStar color='#ffc700' />);
  } else {
    const intPart = Math.floor(rate);
    rateStars = Array(intPart).fill(<FaStar color='#ffc700' />);
    rateStars.push(<FaStarHalf color='#ffc700' />);
  }

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const showNumber = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  const pressLike = () => {
    setIsLike(!isLike);
  };

  return (
    <div className='store'>
      <div className='store-main'>
        <Basket count='1' />
        <ImageSlider className='store-img' slides={SliderData} />

        <div className='store-title'>
          <h1 className='store-name'>000치킨 00점</h1>
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
        <p className='store-rate'>
          {rate} {rateStars}
        </p>
        <div className='store-detailContainer'>
          <div className='store-detail'>
            <h2 className='store-detailText'>찜</h2>
            <p className='store-detailNum'>354</p>
            <h2 className='store-detailText'>리뷰</h2>
            <p className='store-detailNum'>1503</p>
            <PlusInfo text='더보기' arrow='true' />
          </div>
          {showPhoneNumber && (
            <div className='store-popup'>
              <p className='store-popupText'> 010-1234-5678</p>
            </div>
          )}
        </div>
      </div>
      <StoreDeliverTogo />
      <div className='store-menu'>
        <h2 className='store-menuTitle'>인기메뉴</h2>
<<<<<<< HEAD
        <div className='store-menuBlocks' onClick={handleClickOption}>
=======
        <div className='store-menuBlocks'>
>>>>>>> 774ec86cd3ef3f1d7a8d2d10386811af4aac6b44
          <MenuBlock popular={true} />
          <MenuBlock />
          <MenuBlock />
        </div>
      </div>
    </div>
  );
}
