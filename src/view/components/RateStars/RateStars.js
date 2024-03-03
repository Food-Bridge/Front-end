import React from "react";
import { FaStar, FaStarHalf } from 'react-icons/fa';

export default function RateStars() {
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

  return (
    <p className='rateStars'>{rate} {rateStars}</p>
  )
}