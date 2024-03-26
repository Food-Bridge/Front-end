import React, { useState, useEffect } from 'react';
import './MyReview.scss';
import axiosInstance from '../../../api/instance';

import ReviewBox from '../../components/ReviewBox/ReviewBox';
import RateStars from '../../components/RateStars/RateStars';

export default function MyReview() {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/review/`);
      setReviewData(response.data);
    };
    fetchData();
  }, []);

  const ratings = reviewData.map((review) => review.rating);
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const rate = sum / ratings.length;
  
  return (
    <>
      <div className='myReview-header'>
        <div className='myReview-title'>
          <h2 className='myReview-titleText'>나의 리뷰</h2>
        </div>
        <p className='myReview-average'>평균</p>
        <h1 className='myReview-rateValue'>{sum / ratings.length}</h1>
        <p className='myReview-rateStars'><RateStars rate={rate} starOnly /></p>
        <p className='myReview-num'>리뷰 {reviewData.length}개</p>
      </div>
      <div className='myReview-review'>
        {reviewData.map((review) => {
          return <ReviewBox key={review.id} data={review} myReview/>;
        })}
      </div>
    </>
  );
}
