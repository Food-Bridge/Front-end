import React, { useState } from 'react';
import './PaymentMethod.scss';
import logo from '../../../data/tossIcon.png';

const PaymentMethod = ({ selected, click }) => {
  const handleOptionChange = (event) => {
    click(event.target.value);
  };

  return (
    <div className='PaymentMethod'>
      <div className='paymentMethod-frame'>
        <h1 className='paymentMethod-title'>결제수단</h1>
        <div className='paymentMethod-margin'>
          <div className='paymentMethod-direct'>
            <input
              type='radio'
              name='react-tips'
              value='credit_card'
              checked={selected === 'credit_card'}
              onChange={handleOptionChange}
              className='paymentMethod-directRadio'
            />
            <h1 className='paymentMethod-directText'>신용카드</h1>
          </div>
          <div className='paymentMethod-toss'>
            <input
              type='radio'
              name='react-tips'
              value='toss_pay'
              checked={selected === 'toss_pay'}
              onChange={handleOptionChange}
              className='paymentMethod-tossRadio'
            />
            <h1 className='paymentMethod-tossText'>
              <img
                src={logo}
                alt='tossLogo'
                className='paymentMethod-tossLogo'
              />{' '}
              토스페이
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
