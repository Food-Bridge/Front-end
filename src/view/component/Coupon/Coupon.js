import { useState } from 'react';

import './Coupon.scss';
import { TfiDownload } from "react-icons/tfi";

export default function Coupon() {
  const [couponClass, setCouponClass] = useState('coupon-right')
  
  const downloadCoupon = () => {
    setCouponClass(couponClass + ' downloaded')
  }

  return (
    <div className='coupon'>
      <div className='coupon-left'>
        <div className='coupon-content'>
          <h1 className='coupon-title'>15% 할인 쿠폰</h1>
          <div className='coupon-tag'>
            <div className='coupon-tag-box'>
              <p className='coupon-tag-menu'>#치킨</p>
            </div>
            <p className='coupon-tag-info'>#태그와 동일 카테고리 메뉴만 적용</p>
          </div>

          <p className='coupon-info'>20,000원 이상 주문 시</p>
          <p className='coupon-info'>2024 / 01 / 31 까지 사용 가능</p>
        </div>
      </div>
      <button className={couponClass} onClick = {downloadCoupon}>
        <TfiDownload size="35"/>
      </button>
    </div>
  );
}
