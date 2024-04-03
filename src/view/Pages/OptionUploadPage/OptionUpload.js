import React, { useState } from 'react';
import './OptionUpload.scss';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectOwner } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';
import Swal from 'sweetalert2';

function OptionUpload() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, type } = location.state;
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const owner = useSelector(selectOwner);

  const handleAddOption = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      await axiosInstance.post(
        `/restaurant/${owner}/menu/${id}/${type}s/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: '옵션 추가',
        html: '요청이 정상적으로 이루어졌습니다.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      }).then(navigate(-1));
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: '알림',
        html: '입력한 데이터를 확인해주세요.',
        showCancelButton: false,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        confirmButtonColor: '#ca0000',
        cancelButtonColor: 'black',
      });
    }
  };

  return (
    <div className='OptionUpload'>
      <div className='optionUpload-header'>
        <h1 className='optionUpload-optionTitle'>옵션 등록</h1>

        <div className='optionUpload-fieldFrame'>
          {/* 옵션 이름 */}
          <div className='optionUpload-name'>
            <h1 className='optionUpload-title'>옵션 이름</h1>
            <input
              className='optionUpload-optionName'
              type='text'
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 옵션 금액 */}
          <div className='optionUpload-optionPrice'>
            <h1 className='optionUpload-price'>옵션 금액</h1>
            <input
              className='optionUpload-priceInput'
              type='number'
              placeholder={price ? price : '숫자만 입력해주세요'}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* 옵션 등록 버튼 */}
        <div className='optionUpload-uploadBtn'>
          <button
            className='optionUpload-optionUploadBtn'
            onClick={handleAddOption}
          >
            옵션 저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default OptionUpload;
