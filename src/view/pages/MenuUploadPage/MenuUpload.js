import React, { useEffect, useState } from 'react';
import './MenuUpload.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOwner } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';
import Swal from 'sweetalert2';
import BrowserImageCompression from '../../../api/compress';


function MenuUpload() {
  const location = useLocation();
  const { id } = location.state || { id: null };
  const [content, setContent] = useState('');
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [isMain, setIsMain] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const owner = useSelector(selectOwner);
  const navigate = useNavigate();

  const handleAddMenus = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('content', content);
      formData.append('price', price);
      formData.append('is_main', isMain);
      formData.append('is_popular', isPopular);
      if (id !== null) {
        await axiosInstance.patch(
          `/restaurant/${owner}/menu/${id}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        await axiosInstance.post(`/restaurant/${owner}/menu/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      Swal.fire({
        icon: 'success',
        title: id ? '메뉴 수정' : '메뉴 추가',
        html: '요청이 정상적으로 이루어졌습니다.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      }).then(navigate('/mystore/'));
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: '알림',
        html: '입력한 데이터를 확인해주세요.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/restaurant/${owner}/menu/${id}/`);
      setName(res.data.name);
      setContent(res.data.content);
      setPrice(res.data.price);
      setImageDisplay(res.data.image);
      setImage(res.data.image);
    };
    typeof id === 'number' && fetchData();
  }, [id, owner]);

  return (
    <div className='MenuUpload'>
      <h1 className='menuUpload-pageTitle'>메뉴 등록</h1>
      <div className='menuUpload-checkedList'>
        <div className='menuUpload-check'>
          <h1 className='menuUpload-checkText'>메인 메뉴</h1>
          <input
            className='menuUpload-checkBox'
            type='checkbox'
            aria-label='메인 메뉴'
            checked={isMain}
            onChange={() => {
              setIsMain(!isMain);
            }}
          />
        </div>
        <div className='menuUpload-check'>
          <h1 className='menuUpload-checkText'>인기 메뉴</h1>
          <input
            className='menuUpload-checkBox'
            type='checkbox'
            aria-label='인기 메뉴'
            checked={isPopular}
            onChange={() => {
              setIsPopular(!isPopular);
            }}
          />
        </div>
      </div>
      <div className='menuUpload-fieldFrame'>
        <div className='menuUpload-name'>
          <h1 className='menuUpload-title'>메뉴 이름</h1>
          <input
            className='menuUpload-menuName'
            type='text'
            aria-label='메뉴이름'
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='menuUpload-menuPrice'>
          <h1 className='menuUpload-menuTitle'>메뉴 금액</h1>
          <input
            className='menuUpload-priceInput'
            type='number'
            aria-label='메뉴 금액'
            placeholder={price ? price : '숫자만 입력해주세요'}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className='menuUpload-description'>
          <h1 className='menuUpload-title'>메뉴 설명</h1>
          <textarea
            className='menuUpload-storeDescription'
            type='text'
            aria-label='메뉴 설명'
            placeholder={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className='menuUpload-image'>
          <h1 className='menuUpload-title'>메뉴 이미지 등록</h1>
          <img className='menuUpload-imageDisplay' src={imageDisplay} alt='이미지 프리뷰'/>
          <BrowserImageCompression
            className='menuUpload-imageInput'
            setImage={setImage}
            setImageDisplay={setImageDisplay}size='0.5' length='300'
          />
        </div>
      </div>
      <div className='storeUpload-uploadBtn'>
        <button className='storeUpload-storeUploadBtn' onClick={handleAddMenus}>
          {typeof menuId === 'number' ? '수정하기' : '저장하기'}
        </button>
      </div>
    </div>
  );
}

export default MenuUpload;
