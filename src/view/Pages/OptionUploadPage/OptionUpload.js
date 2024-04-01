import React, { useEffect, useState } from 'react'
import './OptionUpload.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { selectOwner } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';

function OptionUpload() {
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');

  const dispatch = useDispatch()
  const owner = useSelector(selectOwner);
  
  const location = useLocation();
  const menuId = location.state.id;

  const formData = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    // menuId가 정상적으로 가져와지는지 확인하기 위해 추가한 console.log
    console.log('menuId:', menuId);
  }, [menuId]);

  const handleAddOption = async () => {
    try {
        const formData = new FormData();
        formData.append('name', name); // 옵션 이름 추가
        formData.append('price', price); // 옵션 가격 추가
    
        await axiosInstance.post(`/restaurant/${owner}/menu/${menuId}/options/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // 필수: 파일 업로드 시에는 Content-Type을 설정해야 합니다.
        },
        });
        navigate('/myStore/')
    } catch (error) {
        alert('에러가 발생했습니다', error);
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
                placeholder={
                price ? price : '숫자만 입력해주세요'
                }
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
  )
}

export default OptionUpload
