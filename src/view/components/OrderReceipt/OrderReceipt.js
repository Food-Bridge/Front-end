import React from 'react';
import './OrderReceipt.scss';
import { HiMiniXMark } from "react-icons/hi2";

export default function OrderReceipt({closeModal}) {
  const menu = [
    { name: '반반치킨(순살)', price: '18,000' },
    { name: '치즈 추가', price: '2,000' },
  ];

  return (
    <>
      <div className='orderReceipt-frame'>
        <header className='orderReceipt-header'>
          <button className='orderReceipt-back' onClick={closeModal}><HiMiniXMark size='30' /></button>
          <h1 className='orderReceipt-title'>영수증</h1>
        </header>
        <div className='orderReceipt-body'>
          <h1 className='orderReceipt-store'>000치킨 00점</h1>
          <p className='orderReceipt-time'>2024-02-24 12:15</p>
          <div className='orderReceipt-menuList'>
            {menu.map(({ name, price }) => (
              <div className='orderReceipt-menu' key={name}>
                <h2 className='orderReceipt-menuName'>{name}</h2>
                <p className='orderReceipt-menuPrice'>{price}원</p>
              </div>
            ))}
          </div>
          <div className='orderReceipt-row'>
            <h3 className='orderReceipt-text'>주문 금액</h3>
            <p className='orderReceipt-value'>20,000원</p>
          </div>
          <div className='orderReceipt-row'>
            <h3 className='orderReceipt-text'>배달 팁</h3>
            <p className='orderReceipt-value'>3,000원</p>
          </div>
          <div className='orderReceipt-total'>
            <h3 className='orderReceipt-totalText'>총 결제금액</h3>
            <p className='orderReceipt-totalValue'>23,000원</p>
          </div>
          <div className='orderReceipt-row'>
            <h3 className='orderReceipt-text'>결제방법</h3>
            <p className='orderReceipt-value'>토스페이</p>
          </div>
          <div className='orderReceipt-row'>
            <h3 className='orderReceipt-text'>배달 주소</h3>
            <p className='orderReceipt-value'>
              서울특별시 역삼로 111 000아파트 101호
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
