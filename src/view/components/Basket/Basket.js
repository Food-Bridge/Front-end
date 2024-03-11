import React from 'react';
import './Basket.scss';

import { CiShoppingBasket } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

export default function Basket({ count}) {
  const navigate = useNavigate()
  const handleOpenBasket = () => {
    navigate('/basket/');
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
