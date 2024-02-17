import React, { useState } from 'react';

import './StoreOption.scss';

import MenuOptionBtn from '../../components/MenuOptionBtn/MenuOptionBtn';
import MenuCheckBox from '../../components/MenuCheckBox/MenuCheckBox';
import Basket from '../../components/Basket/Basket';
import chicken from '../../../data/chicken.jpg';
import { IoIosArrowBack } from 'react-icons/io';

export default function StoreOption({ popular }) {
  const [quantity, setQuantity] = useState(Number(1));

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQunatity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className='storeOption'>
      <div className='storeOption-header'>
        <Basket className='storeOption-basket' count='1' />
        <button className='storeOption-backContainer'>
          <IoIosArrowBack className='storeOption-back' size='30' />
        </button>
        <img src={chicken} className='storeOption-img' />
      </div>
      <div className='storeOption-title'>
        {popular && (
          <div className='storeOption-tag'>
            <p className='storeOption-tag-title'>인기</p>
          </div>
        )}

        <h1 className='storeOpiton-name'>반반 치킨</h1>
      </div>
      <p className='storeOption-detail'>
        출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다 제기하다. 45퍼센트
        참여하다 쉽고 있은 있고,
      </p>
      <MenuOptionBtn />
      <MenuCheckBox />
      <div className='storeOption-footer'>
        <div className='storeOption-footerL'>
          <div className='storeOption-quantity'>
            <button className='storeOption-minus' onClick={decreaseQunatity}>
              -
            </button>
            <p className='storeOption-quantityNum'>{quantity}</p>
            <button className='storeOption-plus' onClick={increaseQuantity}>
              +
            </button>
          </div>
          <div className='storeOption-least'>
            <h1 className='storeOption-leastTitle'>최소 주문 금액</h1>
            <p className='storeOption-leastPrice'>15,000원</p>
          </div>
        </div>

        <button className='storeOption-add'>22,800원 담기</button>
      </div>
    </div>
  );
}
