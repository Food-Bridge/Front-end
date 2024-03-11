import React from 'react';
import './Basket.scss';

import { CiShoppingBasket } from 'react-icons/ci';

export default function Basket({ count}) {
  return (
    <button className='basket'>
      <CiShoppingBasket className='basket-icon'/>
      <div className='basket-count'>
        <h1 className='basket-text' >{count}</h1>
      </div>
    </button>
  );
}
