import React, { useEffect, useState } from 'react';
import './CouponList.scss';
import Coupon from '../../components/Coupon/Coupon';
import axiosInstance from '../../../api/instance';
import Loading from '../../components/Loading/Loading';

function CouponList() {
  const [couponData, setCouponData] = useState([]);
  const [userCoupon, setUserCoupon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get('/userscoupon/')
        .then((result) => setUserCoupon(result.data));
      await axiosInstance
        .get('/coupon/')
        .then((result) => setCouponData(result.data));
      setLoading(false);
    };
    fetchData();
  }, []);

  const userCouponIds = userCoupon.map((coupon) => coupon.coupon_id);

  return (
    <div className='CouponList'>
      {loading && <Loading />}
      <header className='couponList-frame'>
        <h1 className='couponList-title'>할인쿠폰</h1>
        <div className='couponList-couponBlock'>
          {!loading &&
            couponData.map((el) => {
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
