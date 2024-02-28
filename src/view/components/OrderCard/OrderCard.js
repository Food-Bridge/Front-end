import React from 'react';
import './OrderCard.scss';
import { useState } from 'react';

import OrderReceipt from '../OrderReceipt/OrderReceipt';

export default function OrderCard() {
  const [isReview, setIsReview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const menuList = ['숯불반반치킨(순살)', '치즈사리 추가'];
  const receiptBtn = isReview ? 'orderCard-receipt' : 'orderCard-receipt-long';

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <div className='orderCard-modal'>
          <OrderReceipt closeModal={closeModal}/>
        </div>}
      <div className='orderCard-frame'>
        <div className='orderCard-content'>
          <div className='orderCard-img'></div>
          <div className='orderCard-text'>
            <h1 className='orderCard-store'>000치킨 00점</h1>
            <div className='orderCard-menuList'>
              {menuList.map((menu) => (
                <p className='orderCard-menu'>{menu}</p>
              ))}
            </div>
            <div className='orderCard-deliver'>
              <p className='orderCard-deliverStat'>
                2024-02-24 12:15 배달 완료
              </p>
              <p className='orderCard-deliverPrice'>합계 40,000원</p>
            </div>
          </div>
        </div>
        <div className='orderCard-button'>
          <button className={receiptBtn} onClick={openModal}>
            영수증 보기
          </button>
          {isReview && (
            <button className='orderCard-review'>리뷰 작성하기</button>
          )}
        </div>
      </div>
    </>
  );
}
