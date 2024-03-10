import './MenuOptionButton.scss';
import React, { useState } from 'react';

export default function MenuOptionBtn({data, onOptionChange}) {

  const [selectedOption, setSelectedOption] = useState(data[0]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onOptionChange(option)
  };

  return (
    <div className='menuOptionBtn'>
      <header className='menuOptionBtn-header'>
        <h1 className='menuOptionBtn-title'>필수 옵션</h1>
        <p className='menuCheckBox-info'>1개 선택</p>
      </header>
      {data.map((option, index) => (
        <div className='menuOptionBtn-row' key={index}>
          <div className='menuOptionBtn-choice'>
            <input
              className='menuOptionBtn-button'
              type='radio'
              value={option.name}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            <p className='menuOptionBtn-option'>{option.name}</p>
          </div>
          <p className='menuOptionBtn-price'>+{option.price}원</p>
        </div>
      ))}
    </div>
  );
}
