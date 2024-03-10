import React from 'react';
import './Basket.scss';

import { CiShoppingBasket } from 'react-icons/ci';

export default function Basket({ count, white }) {
  return (
    <button className='basket'>
      <CiShoppingBasket size={white ? '32' : '24'} color={white ? 'white' : 'black'} />
      <div className='basket-count'>
        <h1 className='basket-text' >{count}</h1>
      </div>
    </button>
  );
}
