import React from 'react';
import './CouponList.scss';
import Coupon from '../../components/Coupon/Coupon';
import LogoBar from '../../components/LogoBar/LogoBar';

function CouponList() {
  return (
    <>
      <LogoBar />
      <div className='CouponList'>
        <header className='couponList-frame'>
          <h1 className='couponList-title'>할인쿠폰</h1>
          <div className='couponList-couponBlock'>
            <Coupon className='couponList-coupon' />
            <Coupon className='couponList-coupon' />
            <Coupon className='couponList-coupon' />
            <Coupon className='couponList-coupon' />
            <Coupon className='couponList-coupon' />
            <Coupon className='couponList-coupon' />
          </div>
        </header>
      </div>
    </>
  );
}

export default CouponList;
