import React from 'react';
import './PaymentMenu.scss';

import { useNavigate } from 'react-router-dom';

export default function PaymentMenu({
  onIncrease,
  onDecrease,
  onDelete,
  item,
  index,
}) {
  const navigate = useNavigate();

  const handleClickOption = () => {
    navigate(`/restaurant/${item.restaurant}/${item.id}`);
    onDelete(index);
  };

  return (
    <div className='paymentMenu'>
      <img src={item.image} className='paymentMenu-image' />
      <div className='paymentMenu-content'>
        <div className='paymentMenu-header'>
          <h1 className='paymentMenu-title'>{item.name}</h1>
          <button
            className='paymentMenu-delete'
            onClick={() => onDelete(index)}
          >
            X
          </button>
        </div>

        <p className='paymentMenu-detail'>
          {(item.option.length > 0 || item.sOption.length > 0) && ' 옵션 : '}
          {item.option.map((option) => option.name).join(' / ')}{' '}
          {item.option.length > 0 && item.sOption.length > 0 && ' / '}
          {item.sOption.map((sOption) => sOption.name).join(' / ')}
        </p>
        <p className='paymentMenu-price'>
          {(item.price * item.quantity).toLocaleString('ko-KR')}원
        </p>
        <div className='paymentMenu-button'>
          <button className='paymentMenu-optionBtn' onClick={handleClickOption}>
            옵션 변경
          </button>
          <div className='paymentMenu-quantity'>
            <button
              className='paymentMenu-minus'
              onClick={() => onDecrease(index)}
            >
              -
            </button>
            <p className='paymentMenu-quantityNum'>{item.quantity}</p>
            <button
              className='paymentMenu-plus'
              onClick={() => onIncrease(index)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
