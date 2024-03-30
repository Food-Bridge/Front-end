import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import './MenuUpload.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function MenuUpload() {
  const [isOpen, setIsOpen] = useState(false);
  const [storeName, setStoreName] = useState({
    id: 0,
    name: '매장 선택',
  });
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [menuImage, setMenuImage] = useState(null);
  const [menuImageDisplay, setMenuImageDisplay] = useState(null);
  const { resId } = useParams();

  const storeList = [
    { id: 1, name: '매장 1' },
    { id: 2, name: '매장 2' },
    { id: 3, name: '매장 3' },
  ];

  const handleSetMenuImage = (event) => {
    const file = event.target.files[0];
    setMenuImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setMenuImageDisplay(reader.result);
    };
    reader.readAsDataURL(file);

    formData.append('image', file);
  };

  const formData = new FormData();
  const navigate = useNavigate();

  const onChangeName = (event) => {
    formData.append('name', event.target.value);
  };

  const onChangePrice = (event) => {
    formData.append('price', event.target.value);
  };

  const onChangeDescrip = (event) => {
    formData.append('descrip', event.target.value);
  };

  //   const [image, setImage] = useState();
  //   const onChangeImage = (event) => {
  //     const { files } = event.target;
  //     const uploadFile = files[0];
  //     formData.append('image', uploadFile);
  //   }

  return (
    <div className='MenuUpload'>
      <div className='menuUpload-header'>
        <h1 className='menuUpload-pageTitle'>메뉴 등록</h1>

        <div className='menuUpload-fieldFrame'>
          {/* 메뉴 이름 */}
          <div className='menuUpload-name'>
            <h1 className='menuUpload-title'>메뉴 이름</h1>
            <input
              className='menuUpload-menuName'
              type='text'
              placeholder={name}
              onChange={onChangeName}
            />
          </div>

          {/* 메뉴 금액 */}
          <div className='menuUpload-menuPrice'>
            <h1 className='menuUpload-menuTitle'>메뉴 금액</h1>
            <input
              className='menuUpload-priceInput'
              type='number'
              placeholder={price ? price : '숫자만 입력해주세요'}
              onChange={onChangePrice}
            />
          </div>

          {/* 메뉴 설명 */}
          <div className='menuUpload-description'>
            <h1 className='menuUpload-title'>메뉴 설명</h1>
            <textarea
              className='menuUpload-storeDescription'
              type='text'
              placeholder={description}
              onChange={onChangeDescrip}
            />
          </div>

          {/* 메뉴 이미지 */}
          <div className='menuUpload-image'>
            <h1 className='menuUpload-title'>매장 이미지 등록</h1>
            <img className='menuUpload-imageDisplay' src={menuImageDisplay} />
            <input
              className='menuUpload-imageInput'
              type='file'
              onChange={handleSetMenuImage}
            />
          </div>
        </div>
        <div className='storeUpload-uploadBtn'>
          <button
            className='storeUpload-storeUploadBtn'
            onClick={() => {
              axios
                .post(
                  `http://localhost:8000/restaurant/${resId}/menu/`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                  }
                )
                .then(function (response) {
                  console.log(response);
                  navigate('/myStore/');
                })
                .catch(function (error) {
                  console.log(error.response.data);
                });
            }}
          >
            메뉴 저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuUpload;
