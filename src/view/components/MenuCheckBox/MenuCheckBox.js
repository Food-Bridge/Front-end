import React from 'react';
import Swal from 'sweetalert2';
import './MenuCheckBox.scss';
import { useState } from 'react';
import { selectIsSeller } from '../../../redux/reducers/authSlice';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/instance';
import { selectOwner } from '../../../redux/reducers/authSlice';

export default function MenuCheckBox({
  id,
  data,
  onOptionChange,
  type,
  count,
  setOptionData,
}) {
  const owner = useSelector(selectOwner);
  const isSeller = useSelector(selectIsSeller);
  const [ids, setIds] = useState([]);

  const handleButtonClick = (option) => {
    const updatedIds = ids.includes(option.id)
      ? ids.filter((id) => id !== option.id)
      : [...ids, option.id];

    setIds(updatedIds);
    onOptionChange(
      updatedIds.map((id) => {
        return data.find((opt) => opt.id === id);
      })
    );
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
    <div className='menuCheckBox'>
      <header className='menuCheckBox-header'>
        <h1 className='menuCheckBox-title'>{count ? '필수' : '선택'} 옵션</h1>
        {count && <p className='menuCheckBox-info'>{count}개 선택</p>}
      </header>
      {data.map((option) => (
        <div className='menuCheckBox-row' key={option.id}>
          <div className='menuCheckBox-choice'>
            {isSeller && (
              <button
                className='menuCheckBox-deleteBtn'
                onClick={() => handleDeleteOption(option.id)}
              >
                삭제
              </button>
            )}
            <input
              className='menuCheckBox-button'
              type='checkbox'
              aria-label='옵션 버튼'
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
