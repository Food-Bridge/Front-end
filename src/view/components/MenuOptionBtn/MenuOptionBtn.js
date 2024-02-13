import './MenuOptionButton.scss';

import React, { useState } from 'react';

export default function MenuOptionBtn() {
  const options = [
    { text: '통마늘소금바베큐', price: 0 },
    { text: '양념', price: 0 },
    { text: '후라이드', price: 0 },
    { text: '바질크림', price: 0 },
  ];

  const [optionVisible, setOptionVisible] = useState(options[0]);

  return (
    <div className='menuOptionBtn'>
      <header className='menuOptionBtn-header'>
        <h1 className='menuOptionBtn-title'>맛 1 선택</h1>
        <p className='menuOptionBtn-info'>필수</p>
      </header>
      {options.map((option) => (
        <div className='menuOptionBtn-row'>
          <div className='menuOptionBtn-choice'>
            <input
              className='menuOptionBtn-button'
              type='radio'
              checked = {optionVisible === option.text}
              onClick={() => setOptionVisible(option.text)}
            />
            <p className='menuOptionBtn-option'>{option.text}</p>
          </div>
          <p className='menuOptionBtn-price'>+{option.price}원</p>
        </div>
      ))}
    </div>
  );
}
