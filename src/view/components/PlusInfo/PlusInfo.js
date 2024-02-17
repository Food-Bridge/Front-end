import React from 'react';

import './PlusInfo.scss';

import { IoIosArrowForward } from 'react-icons/io';

export default function PlusInfo({ text, arrow, onClick }) {
  return (
    <button className='plusinfo' onClick={onClick}>
      <p className='plusinfo-text'>
        {text}
        {arrow && (
          <IoIosArrowForward className='plusinfo-arrow' color='#8d8d8d' />
        )}
      </p>
    </button>
  );
}
