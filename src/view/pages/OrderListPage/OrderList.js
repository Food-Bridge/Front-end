import React, { useState, useEffect } from 'react';
import './OrderList.scss';

import OrderCard from '../../components/OrderCard/OrderCard';
import axiosInstance from '../../../api/instance';

export default function OrderList() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axiosInstance.get('/order/').then((res) => {
      console.log(res);
      setOrders(res.data);
    });
  }, []);

  return (
    <>
      <h1 className='orderList-title'>주문 내역</h1>
      <div className='orderList-orders'>
        {orders ? (
          orders.map((order) => {
            const today = new Date();
            const created = new Date(order.created_at);
            const diff = today.getTime() - created.getTime();
            let isReview =
              diff < 1000 * 60 * 60 * 24 * 3 && !order.review_written;
            console.log(order.review_written);
            return <OrderCard order={order} isReview={isReview} time={order.estimate_time} />;
          })
        ) : (
          <p className='orderList-noItem'>주문 내역이 없습니다.</p>
        )}
      </div>
    </>
  );
}