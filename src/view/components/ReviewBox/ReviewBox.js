import React from 'react';
import './ReviewBox.scss';

import { FaStar } from 'react-icons/fa';

export default function ReviewBox() {
  const rate = 4;
  const rateStars = Array(rate).fill(<FaStar color='#ffc700' size='14' />);
  
  const menuList = [
    '숯불반반치킨(순살)',
    '치즈사리 추가'
  ]

  return (
    <>
      <header className='reviewBox-header'>
        <div className='reviewBox-profile'>
          <img className='reviewBox-profileImg' src='' />
          <div className='reviewBox-profileContent'>
            <p className='reviewBox-profileName'>닉네임</p>
            <p className='reviewBox-rate'>{rateStars}</p>
          </div>
        </div>
        <p className='reviewBox-date'>2024-02-24</p>
      </header>
      <div className='reviewBox-content'>
        <img className='reviewBox-contentImg' src='' />
        <p className='reviewBox-contentText'>
          출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다 제기하다.
          45퍼센트 참여하다 쉽고 있은 있고 별다르면, 납부하며 돌파하다 출판되게
          폭넓는 개선이 사찰이어 심사가 점수의, 소아다 제기하다. 45퍼센트
          참여하다 쉽고 있은 있고 별다르면, 납부하며 돌파하다.
        </p>
      </div>
      <div className='reviewBox-menuList'>
      {menuList.map((menu) => 
      <p className='reviewBox-menu'>{menu}</p>)}</div>
    </>
  );
}
