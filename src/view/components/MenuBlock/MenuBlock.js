import React from 'react';

import './MenuBlock.scss';

export default function MenuBlock({
  popular,
  main,
  title,
  price,
  content,
  image,
  isSeller,
}) {
  return (
    <>
      <button className='menublock'>
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
          <button className='menublock-patchBtn'>수정</button>
          <button className='menublock-deleteBtn'>삭제</button>
        </div>
      )}
    </>
  );
}
