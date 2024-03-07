import React from 'react';

import './MenuCheckBox.scss';
import { useState } from 'react';

export default function MenuCheckBox({data, count}) {

  const [ids, setIds] = useState([]);

  const handleButtonClick = (data) => {
    setIds((prevState) => {
      const updatedOptions = prevState.includes(data.id)
        ? prevState.filter((option) => option !== data.id)
        : [...prevState, data.id];
      return updatedOptions;
    });
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
              onChange={() => handleButtonClick(option)} // Use onChange instead of onClick for checkboxes
            />
            <p className='menuCheckBox-option'>{option.name}</p>
          </div>
          <p className='menuCheckBox-price'>+{option.price}원</p>
        </div>
      ))}
    </div>
  );
}