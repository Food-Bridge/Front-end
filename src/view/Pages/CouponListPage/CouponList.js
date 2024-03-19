import React, { useEffect, useState } from 'react';
import './CouponList.scss';
import Coupon from '../../components/Coupon/Coupon';
import axiosInstance from '../../../api/instance'

function CouponList() {
  const [couponData, setCouponData] = useState([])
  useEffect(() => {
    const res = axiosInstance.get('/coupon/').then(result => 
    setCouponData(result.data))
  }, []);

  return (
    <div className='CouponList'>
      <header className='couponList-frame'>
        <h1 className='couponList-title'>할인쿠폰</h1>
        <div className='couponList-couponBlock'>
          {couponData.map((el) => {
            return (
              <Coupon
                className='couponList-coupon'
                title={el.code}
                tag='전체'
                price={el.discount_price}
                date={el.formatted_expiration_date}
                min_price={el.minimum_order_price}
              />
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default CouponList;
