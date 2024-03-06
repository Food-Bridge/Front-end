import React from 'react';

import './MenuBlock.scss';

export default function MenuBlock({ popular, main, title, price, content, image }) {
  return (
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
        <p className='menublock-info'>
          {content}
          sdagagbafb
        </p>
      </div>
      {image ? <img className='menublock-image' src={image} alt='반반 치킨'></img> : <div className='menublock-image' />}
    </button>
  );
}
