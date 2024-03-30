import React, { useState } from 'react';

import './MenuBlock.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOwner } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';
import Modal from '../Modal/Modal';

export default function MenuBlock({
  popular,
  main,
  title,
  price,
  content,
  image,
  isSeller,
  menuId
}) {
  const navigate = useNavigate();
  const owner = useSelector(selectOwner);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteMenu = () => {
    axiosInstance.delete(`/restaurant/${owner}/menu/${menuId}`);
    setShowDeleteModal(false);
  };

  const handlePatchMenu = () => {
    navigate(`/menuUpload/`, { state: { id: menuId } });
  };

  const handleClickOption = () => {
    navigate(`${menuId}/`, { state: { id: menuId } });
  };

  const handleClickDelete = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className='menublock-container'>
      {showDeleteModal && (
        <div className='storeUpload-modal'>
          <Modal
            twoBtn
            onConfirm={handleDeleteMenu}
            onCancel={handleCancelDelete}
            contents={['정말로 메뉴를 삭제하시겠습니까?']}
            title={'메뉴 삭제'}
          />
        </div>
      )}
      <button className='menublock' onClick={handleClickOption}>
        <div className='menublock-content'>
          <div className='menublock-title'>
            {popular && (
              <div className='menublock-tag'>
                <p className='menublock-tag-title'>인기</p>
              </div>
            )}
            {main && (
              <div className='menublock-tag'>
                <p className='menublock-tag-title'>메인</p>
              </div>
            )}
            <h1 className='menublock-name'>{title}</h1>
          </div>
          <h2 className='menublock-price'>{price.toLocaleString()}원</h2>
          <p className='menublock-info'>{content}</p>
        </div>
        {image ? (
          <img className='menublock-image' src={image} alt='메뉴 이미지'></img>
        ) : (
          <div className='menublock-image' />
        )}
      </button>
      {isSeller && (
        <div className='menublock-btn'>
          <button className='menublock-patchBtn' onClick={handlePatchMenu}>
            수정
          </button>
          <button className='menublock-deleteBtn' onClick={handleClickDelete}>
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
