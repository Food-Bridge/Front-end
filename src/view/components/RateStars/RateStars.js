import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

export default function RateStars({ rate, starOnly }) {
  const rates = rate !== 0 ? Math.round(rate * 2) / 2 : 0;

  const rateStars = [];
  for (let i = 0; i < Math.floor(rates); i++) {
    rateStars.push(<FaStar key={i} color='#ffc700' />);
  }
  if (rates % 1 !== 0) {
    rateStars.push(<FaStarHalf key='half' color='#ffc700' />);
  }

  return (
    <p className='rateStars'>
      {starOnly ? '' : rate} {rateStars}
    </p>
  );
}
