import React from "react";
import './OrderList.scss'

import OrderCard from '../../components/OrderCard/OrderCard'

export default function OrderList() {
  return (
    <>
    
    <h1 className="orderList-title">주문 내역</h1>
    <div className='orderList-orders'>
      <OrderCard />
      <OrderCard />
    </div>
    </>
  )
}