import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import './MenuUpload.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectOwner, setOwner } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';
import { selectMenu } from '../../../redux/reducers/cartSlice';
import Modal from '../../components/Modal/Modal';

function MenuUpload() {
    const dispatch = useDispatch()
    const menuId = useSelector(selectMenu);
    const [content, setContent] = useState('');
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imageDisplay, setImageDisplay] = useState(null);
    const owner = useSelector(selectOwner);
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const formData = new FormData();
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

    //     const handleAddMenu = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('image', image); // 이미지 파일 추가
    //         formData.append('name', name); // 메뉴 이름 추가
    //         formData.append('content', content); // 메뉴 설명 추가
    //         formData.append('price', price); // 메뉴 가격 추가
    //         // formData.append('restaurant', restaurant);
        
    //         await axiosInstance.post(`/restaurant/${owner}/menu/`, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data', // 필수: 파일 업로드 시에는 Content-Type을 설정해야 합니다.
    //         },
    //         });
    //         navigate('/myStore/')
    //         setShowConfirmModal(true);
    //     } catch (error) {
    //         alert('에러가 발생했습니다', error);
    //     }
    // };


    const handleAddMenus = async () => {
        try {
          const formData = new FormData();
          formData.append('image', image);
          const data = {
            name: name,
            content: content,
            price: price,
          };
          console.log(data);
          if (typeof menuId === 'number') {
            await axiosInstance.patch(`/restaurant/${owner}/menu/${menuId}/`, data);
            image !== null &&
              (await axiosInstance.patch(`/restaurant/${owner}/menu/${menuId}/`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }));
          } else {
            const res = await axiosInstance.post(`/restaurant/${owner}/menu/`, data);
            dispatch(setOwner(res.data.id));
            image !== null &&
              (await axiosInstance.patch(`/restaurant/${owner}/menu/${menuId}/`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }));
          }
          setShowConfirmModal(true);
        } catch (error) {
          console.log('에러가 발생했습니다', error);
        }
      };    

      const handleConfirmModal = () => {
        setShowConfirmModal(false);
      };

      useEffect(() => {
        const fetchData = async () => {
          const res = await axiosInstance.get(`/restaurant/${owner}/menu.${menuId}/`);
          setName(res.data.name);
          setContent(res.data.content);
          setPrice(res.data.price);
          setImageDisplay(res.data.image);
          console.log(res);
        };
        typeof menuId === 'number' && fetchData();
      }, []);      

    return (
        <div className='MenuUpload'>
            {showConfirmModal && (
                <div className='storeUpload-modal'>
                <Modal
                    onConfirm={handleConfirmModal}
                    contents={['요청이 정상적으로 이루어졌습니다.']}
                    title={menuId ? '메뉴 수정' : '메뉴 추가'}
                />
                </div>
            )}            
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
                <h1 className='menuUpload-title'>메뉴 이미지 등록</h1>
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
                onClick={handleAddMenus}
                >
                {typeof menuId === 'number' ? '수정하기' : '저장하기'}
                {/* 메뉴 저장하기 */}
                </button>
            </div>
            </div>
        </div>
    )
}

export default MenuUpload
