import React from 'react';
import './OrderReceipt.scss';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';

export default function OrderReceipt({ order, closeModal, created }) {
  const menu = order.menu_list;
  const isDeliver = order.is_deliver;
  
  return (
    <>
      <div className='orderReceipt-frame'>
        <header className='orderReceipt-header'>
          <button className='orderReceipt-back' onClick={closeModal}>
            <IoMdClose size='30' />
          </button>
          <h1 className='orderReceipt-title'>영수증</h1>
        </header>
        <div className='orderReceipt-body'>
          <h1 className='orderReceipt-store'>{order.restaurant_name}</h1>
          <p className='orderReceipt-time'>
            {created} {order.order_state_name}
          </p>
          <div className='orderReceipt-menuList'>
            {menu.map(({ menu_id, menu_name, price,quantity }) => (
              <div className='orderReceipt-menu' key={menu_id}>
                <h2 className='orderReceipt-menuName'>{menu_name} {quantity}개</h2>
                <p className='orderReceipt-menuPrice'>
                  {price.toLocaleString('ko-KR')}원
                </p>
              </div>
            ))}
          </div>
          {isDeliver && (
            <>
              <div className='orderReceipt-row deliver'>
                <h3 className='orderReceipt-text'>주문 금액</h3>
                <p className='orderReceipt-value'>
                  {(order.total_price - order.delivery_fee).toLocaleString(
                    'ko-KR'
                  )}
                  원
                </p>
              </div>
              <div className='orderReceipt-row'>
                <h3 className='orderReceipt-text'>배달 팁</h3>
                <p className='orderReceipt-value'>
                  {order.delivery_fee.toLocaleString('ko-KR')}원
                </p>
              </div>
            </>
          )}
          <div className='orderReceipt-total'>
            <h3 className='orderReceipt-totalText'>총 결제금액</h3>
            <p className='orderReceipt-totalValue'>
              {order.total_price.toLocaleString('ko-KR')}원
            </p>
          </div>
          <div className='orderReceipt-row'>
            <h3 className='orderReceipt-text'>결제방법</h3>
            <p className='orderReceipt-value'>{order.payment_method_name}</p>
          </div>
          <div className='orderReceipt-row'>
                <h3 className='orderReceipt-text'>가게 요청사항</h3>
                <p className='orderReceipt-value'>{order.restaurant_request || '없음'}</p>
              </div>
          {isDeliver && (
            <>
              <div className='orderReceipt-row'>
                <h3 className='orderReceipt-text'>배달 주소</h3>
                <p className='orderReceipt-value'>{order.deliver_address}</p>
              </div>
              <div className='orderReceipt-row'>
                <h3 className='orderReceipt-text'>배달 요청사항</h3>
                <p className='orderReceipt-value'>
                  {order.deliveryman_request ||'없음'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
