import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import './MenuUpload.scss'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectOwner, setOwner } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';

function MenuUpload() {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imageDisplay, setImageDisplay] = useState(null);
    const owner = useSelector(selectOwner);
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [restaurant,  setRestaurant] = useState(0)

    const storeList = [
        { id: 1, name: '매장 1' },
        { id: 2, name: '매장 2' },
        { id: 3, name: '매장 3' },
      ];

    //   const handleSetMenuImage = (event) => {
    //     const file = event.target.files[0];
    //     setMenuImage(file);
    
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setMenuImageDisplay(reader.result);
    //     };
    //     reader.readAsDataURL(file);

    //     formData.append('image', file);
    //   };

      const formData = new FormData();
      const navigate = useNavigate();

    //   const onChangeName = (event) => {
    //     formData.append('name', event.target.value);
    //   }

    //   const onChangePrice = (event) => {
    //     formData.append('price', event.target.value);
    //   }

    //   const onChangeDescrip = (event) => {
    //     formData.append('descrip', event.target.value);
    //   }

    //   const [image, setImage] = useState();
    //   const onChangeImage = (event) => {
    //     const { files } = event.target;
    //     const uploadFile = files[0];
    //     formData.append('image', uploadFile);
    //   }

    const handleSetImage = (event) => {
        const file = event.target.files[0];
        setImage(file);
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageDisplay(reader.result);
        };
        reader.readAsDataURL(file);
      };

      const handleAddMenu = async () => {
        try {
          const formData = new FormData();
          formData.append('image', image); // 이미지 파일 추가
          formData.append('name', name); // 메뉴 이름 추가
          formData.append('content', content); // 메뉴 설명 추가
          formData.append('price', price); // 메뉴 가격 추가
          formData.append('restaurant', restaurant);
      
          await axiosInstance.post(`/restaurant/${owner}/menu/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // 필수: 파일 업로드 시에는 Content-Type을 설정해야 합니다.
            },
          });
          navigate('/myStore/')
          setShowConfirmModal(true);
        } catch (error) {
          alert('에러가 발생했습니다', error);
        }
      };

    // const handlePostMenu = () => {
    //     axiosInstance.delete(`/restaurant/${owner}/menu/`);
    //     // setShowDeleteModal(false)
    //   };

    return (
        <div className='MenuUpload'>
            <div className='menuUpload-header'>
            <h1 className='menuUpload-pageTitle'>메뉴 등록</h1>

            <div className='menuUpload-fieldFrame'>
                <div>
                    {/* 레스토랑 선택 드롭다운 */}
                    <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                    <option value={0}>매장 선택</option>
                    {storeList.map((store) => (
                        <option key={store.id} value={store.id}>{store.name}</option>
                    ))}
                    </select>
                </div>

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
                    placeholder={
                    price ? price : '숫자만 입력해주세요'
                    }
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
                <h1 className='menuUpload-title'>매장 이미지 등록</h1>
                <img className='storeUpload-imageDisplay' src={imageDisplay} />
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
                onClick={handleAddMenu}
                >
                메뉴 저장하기
                </button>
            </div>
            </div>
        </div>
    );
}

export default MenuUpload
