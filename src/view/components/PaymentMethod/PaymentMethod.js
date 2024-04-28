import React from 'react';
import './PaymentMethod.scss';

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
              aria-label='신용카드 결제'
              checked={selected === 'credit_card'}
              onChange={handleOptionChange}
              className='paymentMethod-directRadio'
            />
            <h1 className='paymentMethod-directText'>신용카드</h1>
          </div>
          <div className='paymentMethod-direct'>
            <input
              type='radio'
              name='react-tips'
              value='cash'
              aria-label='현금 결제'
              checked={selected === 'cash'}
              onChange={handleOptionChange}
              className='paymentMethod-directRadio'
            />
            <h1 className='paymentMethod-directText'>현금</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
