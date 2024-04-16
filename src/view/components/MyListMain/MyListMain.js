import React from 'react';

import './MyListMain.scss';
import { useNavigate } from 'react-router-dom';

import { IoReceiptOutline } from '@react-icons/all-files/io5/IoReceiptOutline';
import { IoChatbubbleEllipsesOutline } from '@react-icons/all-files/io5/IoChatbubbleEllipsesOutline';
import { IoIosHeartEmpty } from '@react-icons/all-files/io/IoIosHeartEmpty';

export default function MyListMain() {
  const navigate = useNavigate('');

  const handleOpenReview = () => {
    navigate('/users/review/');
  };

  const handleOpenOrder = () => {
    navigate('/orderlist/');
  };

  const handleOpenLikes = () => {
    navigate('/users/likes/');
  };

  return (
    <div className='mylistMain'>
      <button className='mylistMain-box' onClick={handleOpenOrder}>
        <div className='mylistMain-content'>
          <IoReceiptOutline size='40' />
          <h2 className='mylistMain-title'>주문내역</h2>
        </div>
      </button>
      <button className='mylistMain-box' onClick={handleOpenReview}>
        <IoChatbubbleEllipsesOutline size='40' />
        <h2 className='mylistMain-title'>나의 리뷰</h2>
      </button>
      <button
        className='mylistMain-box mylistMain-last'
        onClick={handleOpenLikes}
      >
        <IoIosHeartEmpty size='40' />
        <h2 className='mylistMain-title'>찜 목록</h2>
      </button>
    </div>
  );
}
