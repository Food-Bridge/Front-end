import React, { useEffect, useState } from 'react';
import './StoreReview.scss';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { FaStarHalf } from '@react-icons/all-files/fa/FaStarHalf';
import { useParams } from 'react-router-dom';

import ReviewBox from '../../components/ReviewBox/ReviewBox';
import axiosInstance from '../../../api/instance';
import Loading from '../../components/Loading/Loading';

export default function StoreReview() {
  const { resId } = useParams();
  const [reviewData, setReviewData] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/restaurant/${resId}/reviews/`);
      setReviewData(res.data);
      const response = await axiosInstance.get(`/restaurant/${resId}`);
      setRestaurant(response.data);
      setLoading(false);
    };
    fetchData();
  }, [resId]);

  function roundRates(number) {
    return Math.round(number * 2) / 2;
  }
  const rate = roundRates(restaurant.averageRating);

  let rateStars;
  if (rate && !isNaN(rate)) {
    if (rate % 1 === 0) {
      rateStars = Array(rate).fill(<FaStar color='#ffc700' size='20' />);
    } else {
      const intPart = Math.floor(rate);
      rateStars = Array(intPart).fill(<FaStar color='#ffc700' size='20' />);
      rateStars.push(<FaStarHalf color='#ffc700' size='20' />);
    }
  }

  return (
    <>
      <div className='storeReview-header'>
        <div className='storeReview-title'>
          <h2 className='storeReview-titleText'>{restaurant.name} 리뷰</h2>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <p className='storeReview-average'>평균</p>
            <h1 className='storeReview-rateValue'>
              {restaurant.averageRating}
            </h1>
            <p className='storeReview-rateStars'>{rateStars}</p>
            <p className='storeReview-num'>리뷰 {restaurant.reviewCount}</p>
          </>
        )}
      </div>
      {!loading && (
        <div className='storeReview-review'>
          {reviewData.map((data) => {
            return <ReviewBox data={data} />;
          })}
        </div>
      )}
    </>
  );
}
