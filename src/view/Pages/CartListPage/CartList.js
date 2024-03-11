import React from 'react';
import './CartList.scss';
import chicken from '../../../data/chicken.jpg';

import { CiDeliveryTruck } from 'react-icons/ci';
import PaymentMenu from '../../components/PaymentMenu/PaymentMenu';

export default function CartList() {
  return (
    <>
      <h1 className='cartlist-header'>주문하기</h1>
      <div className='cartlist-info'>
        <div className='cartlist-store'>
          <img className='cartlist-storeImg' src={chicken} />
          <h2 className='cartlist-storeName'>000매장 00점</h2>
        </div>
        <div className='cartlist-deliver'>
          <CiDeliveryTruck size='30' />
          <h2 className='cartlist-deliverTime'>30~40분 후 도착 예정</h2>
        </div>
      </div>
      <div className='cartlist-delete'>
        <button className='cartlist-deleteBtn'>전체 삭제</button>
      </div>
      <div className='cartlist-menu'>
        <PaymentMenu />
        <PaymentMenu />
      </div>
      <div className='cartlist-add'>
        <button className='cartlist-addBtn'>+ 메뉴 추가하기</button>
      </div>
      <div className='cartlist-priceGroup'>
        <div className='cartlist-price'>
          <h2 className='cartlist-title'>총 주문 금액</h2>
          <p className='cartlist-value'>20,000원</p>
        </div>
        <div className='cartlist-price'>
          <h2 className='cartlist-title'>배달 팁</h2>
          <p className='cartlist-value'>3,000원</p>
        </div>
      </div>
      <div className='cartlist-priceGroup'>
        <div className='cartlist-price'>
          <h2 className='cartlist-title'>결제 예정 금액</h2>
          <p className='cartlist-value'>23,000원</p>
        </div>
      </div>
      <button className='cartlist-orderBtn'>23,000원 배달 결제하기</button>
    </>
  );
}
