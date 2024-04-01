import React from 'react';

import './MenuCheckBox.scss';
import { useState } from 'react';

export default function MenuCheckBox({ data, count, onOptionChange }) {
  const [ids, setIds] = useState([]);

  const handleButtonClick = (option) => {
    const updatedIds = ids.includes(option.id)
      ? ids.filter((id) => id !== option.id)
      : [...ids, option.id];
  
    setIds(updatedIds);
    onOptionChange(updatedIds.map(id => {
      return data.find(opt => opt.id === id);
    }));
  };
  
  return (
    <div className='menuCheckBox'>
      <header className='menuCheckBox-header'>
        <h1 className='menuCheckBox-title'>{count ? '필수' : '선택'} 옵션</h1>
        {count && <p className='menuCheckBox-info'>{count}개 선택</p>}
      </header>
      {data.map((option) => (
        <div className='menuCheckBox-row' key={option.id}>
          <div className='menuCheckBox-choice'>
            <input
              className='menuCheckBox-button'
              type='checkbox'
              checked={ids.includes(option.id)}
              onChange={() => handleButtonClick(option)}
            />
            <p className='menuCheckBox-option'>{option.name}</p>
          </div>
          <p className='menuCheckBox-price'>+{option.price}원</p>
        </div>
      ))}
    </div>
  );
}
