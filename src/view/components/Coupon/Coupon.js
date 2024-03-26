import React, { useState } from 'react';

import './Coupon.scss';
import { TfiDownload } from 'react-icons/tfi';
import axiosInstance from '../../../api/instance';

export default function Coupon({ data, downloaded }) {
  const [couponClass, setCouponClass] = useState(
    downloaded ? 'coupon-right downloaded' : 'coupon-right'
  );
console.log(data)
  const downloadCoupon = () => {
    setCouponClass(couponClass + ' downloaded');
    axiosInstance.post('/coupon/', { code: data.code, content: data.content, minimum_order_price: data.minimum_order_price, discount_price: data.discount_price });
  };

  return (
    <div className='Coupon'>
      <div className='coupon-left'>
        <div className='coupon-content'>
          <h1 className='coupon-title'>{data.code}</h1>
          <p className='coupon-detail'>{data.content}</p>
          <p className='coupon-info'>
            {data.minimum_order_price}원 이상 주문 시{' '}
            <p className='coupon-price'>{data.discount_price}원</p> 할인
          </p>
          <p className='coupon-info '>
            <p className='coupon-expiration'>
              {data.formatted_expiration_date}
            </p>{' '}
            사용 가능
          </p>
        </div>
      </div>
      <button className={couponClass} onClick={downloadCoupon}>
        <TfiDownload size='35' />
      </button>
    </div>
  );
}
