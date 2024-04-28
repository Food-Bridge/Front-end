import React, { useState } from 'react';
import './Coupon.scss';
import { IoDownloadOutline } from '@react-icons/all-files/io5/IoDownloadOutline';
import axiosInstance from '../../../api/instance';

export default function Coupon({ data, downloaded }) {
  const [download, setDownload] = useState(downloaded);

  const downloadCoupon = () => {
    setDownload(true);
    axiosInstance.post('/userscoupon/', {
      code: data.code,
      content: data.content,
      minimum_order_price: data.minimum_order_price,
      discount_price: data.discount_price,
    });
  };

  return (
    <div className='Coupon'>
      <div className='coupon-left'>
        <div className='coupon-content'>
          <h1 className='coupon-title'>{data.content}</h1>
          <p className='coupon-detail'>{data.code}</p>
          <div className='coupon-info'>
            {data.minimum_order_price}원 이상 주문 시
            <p className='coupon-price'>{data.discount_price}원</p> 할인
          </div>
          <div className='coupon-info '>
            <p className='coupon-expiration'>
              {data.formatted_expiration_date}
            </p>
            사용 가능
          </div>
        </div>
      </div>
      {download ? (
        <div className='coupon-right downloaded'>
          <IoDownloadOutline size='35' />
        </div>
      ) : (
        <button className='coupon-right' onClick={downloadCoupon}>
          <IoDownloadOutline size='35' />
        </button>
      )}
    </div>
  );
}
