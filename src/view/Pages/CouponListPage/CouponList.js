import React, { useEffect, useState } from 'react';
import './CouponList.scss';
import Coupon from '../../components/Coupon/Coupon';
import axiosInstance from '../../../api/instance';

function CouponList() {
  const [couponData, setCouponData] = useState([]);
  const [userCoupon, setUserCoupon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get('/userscoupon/')
        .then((result) => setUserCoupon(result.data));
      await axiosInstance
        .get('/coupon/')
        .then((result) => setCouponData(result.data));
    };
    fetchData();
  }, []);

  const userCouponIds = userCoupon.map((coupon) => coupon.id);

  return (
    <div className='CouponList'>
      <header className='couponList-frame'>
        <h1 className='couponList-title'>할인쿠폰</h1>
        <div className='couponList-couponBlock'>
          {couponData.map((el) => {
            const isOwned = userCouponIds.includes(el.id);
            return (
              <Coupon
                key={el.id}
                className='couponList-coupon'
                data={el}
                downloaded={isOwned}
              />
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default CouponList;
