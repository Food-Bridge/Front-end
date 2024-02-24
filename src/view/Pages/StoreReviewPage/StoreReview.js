import React from 'react';
import './StoreReview.scss';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';
import { CiCamera } from 'react-icons/ci';

import ReviewBox from '../../components/ReviewBox/ReviewBox';

export default function StoreReview() {
  function roundRates(number) {
    return Math.round(number * 2) / 2;
  }
  const rate = roundRates(4.72);
  let rateStars;
  if (rate % 1 === 0) {
    rateStars = Array(rate).fill(<FaStar color='#ffc700' />);
  } else {
    const intPart = Math.floor(rate);
    rateStars = Array(intPart).fill(<FaStar color='#ffc700' size='20' />);
    rateStars.push(<FaStarHalf color='#ffc700' size='20' />);
  }

  return (
    <>
      <div className='storeReview-header'>
        <div className='storeReview-title'>
          <button className='storeReview-bakcBtn'>
            <IoIosArrowBack size='30' />
          </button>
          <h2 className='storeReview-titleText'>000치킨 00점 리뷰</h2>
        </div>

        <h1 className='storeReview-rateValue'>4.72</h1>
        <p className='storeReview-rateStars'>{rateStars}</p>
        <p className='storeReview-num'>리뷰 1503</p>
      </div>
      <div className='storeReview-buttons'>
        <button className='storeReview-button storeReview-imgBtn'>
          <CiCamera size='20' />
          사진 리뷰만 보기
        </button>
        <button className='storeReview-button storeReview-arrayBtn'>
          <p className='storeReview-arrayText'>최신순</p>
          <IoIosArrowDown size='16' />
        </button>
      </div>
      <div className='storeReview-review'>
        <ReviewBox />
        <ReviewBox />
        <ReviewBox />
      </div>
    </>
  );
}
