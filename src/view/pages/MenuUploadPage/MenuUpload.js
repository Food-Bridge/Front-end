import React, { useEffect, useState } from 'react';
import './MenuUpload.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectOwner, setOwner } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';
import Swal from 'sweetalert2';

function MenuUpload() {
  const location = useLocation();
  const { id } = location.state || { id: null };
  const [content, setContent] = useState('');
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const owner = useSelector(selectOwner);
  const navigate = useNavigate();

  const handleSetImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageDisplay(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddMenus = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('content', content);
      formData.append('price', price);
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
  }, []);

  return (
    <div className='MenuUpload'>
      <div className='menuUpload-header'>
        <h1 className='menuUpload-pageTitle'>메뉴 등록</h1>

        <div className='menuUpload-fieldFrame'>
          {/* <div>
                    레스토랑 선택 드롭다운
                    <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                    <option value={0}>매장 선택</option>
                    {storeList.map((store) => (
                        <option key={store.id} value={store.id}>{store.name}</option>
                    ))}
                    </select>
                </div> */}

          {/* 메뉴 이름 */}
          <div className='menuUpload-name'>
            <h1 className='menuUpload-title'>메뉴 이름</h1>
            <input
              className='menuUpload-menuName'
              type='text'
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 메뉴 금액 */}
          <div className='menuUpload-menuPrice'>
            <h1 className='menuUpload-menuTitle'>메뉴 금액</h1>
            <input
              className='menuUpload-priceInput'
              type='number'
              placeholder={price ? price : '숫자만 입력해주세요'}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* 메뉴 설명 */}
          <div className='menuUpload-description'>
            <h1 className='menuUpload-title'>메뉴 설명</h1>
            <textarea
              className='menuUpload-storeDescription'
              type='text'
              placeholder={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* 메뉴 이미지 */}
          <div className='menuUpload-image'>
            <h1 className='menuUpload-title'>메뉴 이미지 등록</h1>
            <img className='menuUpload-imageDisplay' src={imageDisplay} />
            <input
              className='menuUpload-imageInput'
              type='file'
              onChange={handleSetImage}
            />
          </div>
        </div>
        <div className='storeUpload-uploadBtn'>
          <button
            className='storeUpload-storeUploadBtn'
            onClick={handleAddMenus}
          >
            {typeof menuId === 'number' ? '수정하기' : '저장하기'}
            {/* 메뉴 저장하기 */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuUpload;
