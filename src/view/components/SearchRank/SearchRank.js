import React from 'react';
import './SearchRank.scss';
import { GoTriangleUp } from '@react-icons/all-files/go/GoTriangleUp';
import { GoTriangleDown } from '@react-icons/all-files/go/GoTriangleDown';
import { GoHorizontalRule } from '@react-icons/all-files/go/GoHorizontalRule';

export default function SearchRank({ rank, text, type }) {
  return (
    <div className='searchRank'>
      <p className='searchRank-num'>{rank}</p>
      <p className='searchRank-text'>{text}</p>
      <div className='searchRank-icon'>
        {type === 'up' ? (
          <GoTriangleUp color='red' size='24' />
        ) : type === 'down' ? (
          <GoTriangleDown color='blue' size='24' />
        ) : (
          <GoHorizontalRule size='20' />
        )}
      </div>
    </div>
  );
}
