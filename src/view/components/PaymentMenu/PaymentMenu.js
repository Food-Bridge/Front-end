import React from 'react';
import './PaymentMenu.scss';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMenuImg } from '../../../redux/reducers/cartSlice';

export default function PaymentMenu({
  onIncrease,
  onDecrease,
  onDelete,
  item,
  index,
}) {
  const navigate = useNavigate();
  const id = item.menu_id;
  const menuImg = useSelector(selectMenuImg);
  const image = menuImg[item.menu_id];
  console.log(item);
  const handleClickOption = () => {
    navigate(`/restaurant/${item.restaurant}/${id}`);
    onDelete(index);
  };
  console.log(item.option_list);
  return (
    <div className='paymentMenu'>
      <img src={image} className='paymentMenu-image' alt='메뉴 이미지' />
      <div className='paymentMenu-content'>
        <div className='paymentMenu-header'>
          <h1 className='paymentMenu-title'>{item.menu_name}</h1>
          <button
            className='paymentMenu-delete'
            onClick={() => onDelete(index)}
          >
            X
          </button>
        </div>

        <p className='paymentMenu-detail'>
          {item.option_list && item.option_list.length > 0 && ' 옵션 : '}
          {item.option_list &&
            item.option_list.map((option) => option.option_name).join(' / ')}
          {item.option_list &&
            item.option_list.length > 0 &&
            item.soption_list &&
            item.soption_list.length > 0 &&
            ' / '}
          {item.soption_list &&
            item.soption_list.map((soption) => soption.option_name).join(' / ')}
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
