import React from 'react';
import './CouponList.scss';
import Coupon from '../../components/Coupon/Coupon';
import { couponData } from '../../../data/CouponData/CouponData';

function CouponList() {

  return (
    <div className='CouponList'>
      <header className='couponList-frame'>
        <h1 className='couponList-title'>할인쿠폰</h1>
        <div className='couponList-couponBlock'>
          {couponData.map((el) => {
            return <Coupon  className='couponList-coupon' sale={el.sale} menuTag={el.menuTag} price={el.price} year={el.year} month={el.month} day={el.day} />
          })}
        </div>
      </header>
    </div>
  );
}

export default CouponList;
