import React from 'react';
import './StoreTag.scss';

function StoreTag({ tagName }) {
  return (
    <div className='storeTag-margin'>
      <header className='storeTag-frame'>
        <div className='storeTag-text'># {tagName}</div>
      </header>
    </div>
  );
}

export default StoreTag;
