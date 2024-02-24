import React from 'react';

import './MyListMain.scss';
import { useNavigate } from 'react-router-dom';

import { TfiReceipt } from 'react-icons/tfi';
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { CiHeart } from 'react-icons/ci';

export default function MyListMain() {
  const navigate = useNavigate('')

  const handleOpenReview = () => {
    navigate('review')
  }

  return (
    <div className='mylistMain'>
      <button className='mylistMain-box'>
        <div className='mylistMain-content'>
          <TfiReceipt size='40' />
          <h2 className='mylistMain-title'>주문내역</h2>
        </div>
      </button>
      <button className='mylistMain-box' onClick={handleOpenReview}>
        <HiOutlineChatBubbleLeftEllipsis size='40' />
        <h2 className='mylistMain-title'>나의 리뷰</h2>
      </button>
      <button className='mylistMain-box mylistMain-last'>
        <CiHeart size='40' />
        <h2 className='mylistMain-title'>찜 목록</h2>
      </button>
    </div>
  );
}
