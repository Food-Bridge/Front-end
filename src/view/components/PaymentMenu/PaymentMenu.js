import { useState } from 'react';
import './PaymentMenu.scss';

import menuImg from '../../../data/chicken.jpg';

export default function PaymentMenu({onDelete}) {
  const [quantity, setQuantity] = useState(Number(1));

  const increaseQuantity = () => {
    setQuantity(quantity+1)
  }
  const decreaseQunatity = () => {
    if (quantity === 1) {
      onDelete()
    }
    setQuantity(quantity-1)
  }

  return (
    <div className='paymentMenu'>
      <img src={menuImg} className='paymentMenu-image' />
      <div className='paymentMenu-content'>
        <div className='paymentMenu-header'>
          <h1 className='paymentMenu-title'>반반치킨</h1>
          <button className='paymentMenu-delete' onClick={onDelete}>X</button>
        </div>

        <p className='paymentMenu-detail'>
          옵션: 리뷰 이벤트 - 콜라 / 공기밥 추가 / 반찬 추가
        </p>
        <p className='paymentMenu-price'>10,000원</p>
        <div className='paymentMenu-button'>
          <button className='paymentMenu-optionBtn'>옵션 변경</button>
          <div className='paymentMenu-quantity'>
            <button className='paymentMenu-minus' onClick={decreaseQunatity}>-</button>
            <p className='paymentMenu-quantityNum'>{quantity}</p>
            <button className='paymentMenu-plus' onClick={increaseQuantity}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
