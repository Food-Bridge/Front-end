import { useSelector } from 'react-redux';
import './MenuOptionButton.scss';
import React, { useState } from 'react';
import { selectIsSeller, selectOwner } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';
import Swal from 'sweetalert2';

export default function MenuOptionBtn({
  id,
  data,
  onOptionChange,
  type,
  setOptionData,
}) {
  const owner = useSelector(selectOwner);
  const isSeller = useSelector(selectIsSeller);
  const [selectedOption, setSelectedOption] = useState([]);
  
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onOptionChange([option]);
  };

  const handleDeleteOption = (optionId) => {
    Swal.fire({
      icon: 'warning',
      title: '알림',
      html: '옵션을 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      confirmButtonColor: '#ca0000',
      cancelButtonColor: 'black',
    }).then((res) => {
      res.isConfirmed &&
        axiosInstance
          .delete(`/restaurant/${owner}/menu/${id}/${type}s/${optionId}/`)
          .then(() => {
            axiosInstance
              .get(`/restaurant/${owner}/menu/${id}/options/`)
              .then((res) => setOptionData(res.data));
          });
    });
  };

  return (
    <div className='menuOptionBtn'>
      <header className='menuOptionBtn-header'>
        <h1 className='menuOptionBtn-title'>필수 옵션</h1>
        <p className='menuOptionBtn-info'>1개 선택</p>
      </header>
      {data.map((option) => (
        <div className='menuOptionBtn-row' key={option.id}>
          <div className='menuOptionBtn-choice'>
            {isSeller && (
              <button
                className='menuOptionBtn-deleteBtn'
                onClick={() => handleDeleteOption(option.id)}
              >
                삭제
              </button>
            )}
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
