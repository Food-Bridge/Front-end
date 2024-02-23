import React from 'react';
import './BasketList.scss';
import PlusInfo from '../../components/PlusInfo/PlusInfo';
import chicken from '../../../data/chicken.jpg';

import { CiDeliveryTruck } from 'react-icons/ci';
import PaymentMenu from '../../components/PaymentMenu/PaymentMenu';

export default function BasketList() {
  return (
    <>
      <h1 className='basketlist-header'>주문하기</h1>
      <div className='basketlist-info'>
        <div className='basketlist-store'>
          <img className='basketlist-storeImg' src={chicken} />
          <h2 className='basketlist-storeName'>000매장 00점</h2>
        </div>
        <div className='basketlist-deliver'>
          <CiDeliveryTruck size='30' />
          <h2 className='basketlist-deliverTime'>30~40분 후 도착 예정</h2>
        </div>
      </div>
      <div className='basketlist-delete'>
        <button className='basketlist-deleteBtn'>전체 삭제</button>
      </div>
      <div className='basketlist-menu'>
        <PaymentMenu />
        <PaymentMenu />
      </div>
      <div className='basketlist-add'>
        <button className='basketlist-addBtn'>+ 메뉴 추가하기</button>
      </div>
      <div className='basketlist-priceGroup'>
        <div className='basketlist-price'>
          <h2 className='basketlist-title'>총 주문 금액</h2>
          <p className='basketlist-value'>20,000원</p>
        </div>
        <div className='basketlist-price'>
          <h2 className='basketlist-title'>배달 팁</h2>
          <p className='basketlist-value'>3,000원</p>
        </div>
      </div>
      <div className='basketlist-priceGroup'>
        <div className='basketlist-price'>
          <h2 className='basketlist-title'>결제 예정 금액</h2>
          <p className='basketlist-value'>23,000원</p>
        </div>
      </div>
      <button className='basketlist-orderBtn'>23,000원 배달 결제하기</button>
    </>
  );
}
