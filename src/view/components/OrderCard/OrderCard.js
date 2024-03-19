import React from 'react';
import './OrderCard.scss';
import { useState } from 'react';

import OrderReceipt from '../OrderReceipt/OrderReceipt';
import { useNavigate } from 'react-router-dom';

export default function OrderCard({ order, isReview }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const created = `${new Date(order.created_at).toLocaleDateString(
    'ko-KR'
  )} ${new Date(order.created_at).toLocaleTimeString('ko-KR')}`;
  const menuList = order.menu_list;
  const receiptBtn = isReview ? 'orderCard-receipt' : 'orderCard-receipt-long';

  const handleClickReview = () => {
    navigate('/restaurant/reviewUpload', { state: { reviewId: order.restaurant } });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className='orderCard-modal'>
          <OrderReceipt
            closeModal={closeModal}
            order={order}
            created={created}
          />
        </div>
      )}
      <div className='orderCard-frame'>
        <div className='orderCard-content'>
          <img
            className='orderCard-img'
            src={order.restaurant_image}
            alt='레스토랑 이미지'
          />
          <div className='orderCard-text'>
            <h1 className='orderCard-store'>{order.restaurant_name}</h1>
            <div className='orderCard-menuList'>
              {menuList.map((menu) => (
                <p className='orderCard-menu' key={menu.menu_id}>
                  {menu.menu_name}
                </p>
              ))}
            </div>
            <div className='orderCard-order'>
              <p className='orderCard-orderTime'>{created}</p>
              <p className='orderCard-orderState'>{order.order_state_name}</p>
            </div>
            <p className='orderCard-deliverPrice'>
              합계 {order.total_price.toLocaleString('ko-KR')}원
            </p>
          </div>
        </div>
        <div className='orderCard-button'>
          <button className={receiptBtn} onClick={openModal}>
            영수증 보기
          </button>
          {isReview && (
            <button className='orderCard-review' onClick={handleClickReview}>
              리뷰 작성하기
            </button>
          )}
        </div>
      </div>
    </>
  );
}
