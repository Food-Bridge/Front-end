import './MenuCheckBox.scss';
import { useState } from 'react';

export default function MenuCheckBox() {
  const options = [
    { text: '통마늘소금바베큐', price: 0, id: 0 },
    { text: '양념', price: 0, id: 1 },
    { text: '후라이드', price: 0, id: 2 },
    { text: '바질크림', price: 0, id: 3 },
  ];

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
        <h1 className='menuCheckBox-title'>맛 2 선택</h1>
        <p className='menuCheckBox-info'>필수</p>
      </header>
      {options.map((option) => (
        <div className='menuCheckBox-row' key={option.id}>
          <div className='menuCheckBox-choice'>
            <input
              className='menuCheckBox-button'
              type='checkbox'
              checked={ids.includes(option.id)}
              onChange={() => handleButtonClick(option)} // Use onChange instead of onClick for checkboxes
            />
            <p className='menuCheckBox-option'>{option.text}</p>
          </div>
          <p className='menuCheckBox-price'>+{option.price}원</p>
        </div>
      ))}
    </div>
  );
}