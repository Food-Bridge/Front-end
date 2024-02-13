import React from 'react';

import './SearchRank.scss';

import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';
import { MdOutlineHorizontalRule } from 'react-icons/md';

export default function SearchRank({ rank, text, type }) {
  return (
    <div className='searchRank'>
      <p className='searchRank-num'>{rank}</p>
      <p className='searchRank-text'>{text}</p>
      <div className='searchRank-icon'>{type === 'up' ? <RxTriangleUp color='red' size='24'/> : (type === 'down' ? <RxTriangleDown color='blue' size='24'/> : <MdOutlineHorizontalRule size='20'/>)}</div>
    </div>
  );
}
