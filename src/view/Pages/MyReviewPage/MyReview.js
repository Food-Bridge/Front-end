import React from 'react';
import './MyReview.scss';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';
import { CiCamera } from 'react-icons/ci';

import ReviewBox from '../../components/ReviewBox/ReviewBox';

export default function MyReview() {
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
      <div className='myReview-header'>
        <div className='myReview-title'>
          <button className='myReview-bakcBtn'>
            <IoIosArrowBack size='30' />
          </button>
          <h2 className='myReview-titleText'>나의 리뷰</h2>
        </div>
        <p className='myReview-average'>평균</p>
        <h1 className='myReview-rateValue'>4.72</h1>
        <p className='myReview-rateStars'>{rateStars}</p>
        <p className='myReview-num'>리뷰 1503</p>
      </div>
      <div className='myReview-buttons'>
        <button className='myReview-button myReview-imgBtn'>
          <CiCamera size='20' />
          사진 리뷰만 보기
        </button>
        <button className='myReview-button myReview-arrayBtn'>
          <p className='myReview-arrayText'>최신순</p>
          <IoIosArrowDown size='16' />
        </button>
      </div>
      <div className='myReview-review'>
        <ReviewBox />
        <ReviewBox />
        <ReviewBox />
      </div>
    </>
  );
}
