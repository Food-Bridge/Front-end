import React from 'react';
import './Basket.scss';

import { CiShoppingBasket } from 'react-icons/ci';

export default function Basket({ count }) {
  return (
    <div className='basket-container'>
      <button className='basket'>
        <CiShoppingBasket size='30' color='white' />
        <div className='basket-count'>
          <h1 className='basket-text'>{count}</h1>
        </div>
      </button>
    </div>
  );
}
