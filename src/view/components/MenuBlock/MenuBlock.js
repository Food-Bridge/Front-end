import React, { useState } from 'react';

import './MenuBlock.scss';
import { useNavigate } from 'react-router-dom';

export default function MenuBlock({
  popular,
  main,
  title,
  price,
  content,
  image,
  isSeller,
  onClick,
}) {
  const navigate = useNavigate();

  return (
    <div className='menublock-container'>
      <button
        className='menublock'
        onClick={onClick}
      >
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
      {isSeller  && (
        <div className='menublock-btn'>
          <button
            className='menublock-patchBtn'
            onClick={() => navigate('/menuUpload/')}
          >
            수정
          </button>
          <button className='menublock-deleteBtn'>삭제</button>
        </div>
      )}
    </div>
  );
}
