import React from 'react';
import './Basket.scss';

import { CiShoppingBasket } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../redux/reducers/cartSlice';

export default function Basket() {
  const navigate = useNavigate()
  const menu = useSelector(selectMenu);
  const count = menu.length

  const handleOpenBasket = () => {
    navigate('/cart/');
  };
  
  return (
    <button className='basket' onClick={handleOpenBasket}>
      <CiShoppingBasket className='basket-icon'/>
      <div className='basket-count'>
        <h1 className='basket-text' >{count}</h1>
      </div>
    </button>
  );
}
