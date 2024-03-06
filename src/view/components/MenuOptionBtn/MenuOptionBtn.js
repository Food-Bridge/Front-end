import './MenuOptionButton.scss';
import React, { useState } from 'react';

export default function MenuOptionBtn() {
  const options = [
    { text: '통마늘소금바베큐', price: 0 },
    { text: '양념', price: 0 },
    { text: '후라이드', price: 0 },
    { text: '바질크림', price: 0 },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='menuOptionBtn'>
      <header className='menuOptionBtn-header'>
        <h1 className='menuOptionBtn-title'>맛 1 선택</h1>
        <p className='menuOptionBtn-info'>필수</p>
      </header>
      {options.map((option, index) => (
        <div className='menuOptionBtn-row' key={index}>
          <div className='menuOptionBtn-choice'>
            <input
              className='menuOptionBtn-button'
              type='radio'
              value={option.text}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            <p className='menuOptionBtn-option'>{option.text}</p>
          </div>
          <p className='menuOptionBtn-price'>+{option.price}원</p>
        </div>
      ))}
    </div>
  );
}
