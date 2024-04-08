import React from 'react';
import './Loading.scss';
import { RotateLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div className='loading'>
      <p className='loading-text'>잠시만 기다려 주세요.</p>
      <RotateLoader color='#000000' />
    </div>
  );
};

export default Loading;
