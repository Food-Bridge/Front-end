import React from 'react';
import './ReviewBox.scss';
import { FaStar } from 'react-icons/fa';

export default function ReviewBox({ data, myReview }) {
  console.log(data);
  const rate = data.rating;
  const rateStars = Array(rate).fill(<FaStar color='#ffc700' size='14' />);
  const menuName = data.menu_name;
  const dateTimeString = data.created_at;
  const dateTime = new Date(dateTimeString);
  const formattedDate = dateTime.toISOString().split('T')[0];

  return (
    <>
      <header className='reviewBox-header'>
        <div className='reviewBox-profile'>
          <img
            className='reviewBox-profileImg'
            src={myReview ? data.restaurant_image : data.user_image}
          />
          <div className='reviewBox-profileContent'>
            <p className='reviewBox-profileName'>
              {myReview ? data.restaurant_name : data.user_nickname || '닉네임'}
            </p>
            <p className='reviewBox-rate'>{rateStars}</p>
          </div>
        </div>
        <p className='reviewBox-date'>{formattedDate}</p>
      </header>
      <div className='reviewBox-content'>
        {data.image.length > 0 && (
          <img className='reviewBox-contentImg' src={data.image[0].image} />
        )}
        <p className='reviewBox-contentText'>{data.caption}</p>
      </div>
      <div className='reviewBox-menuList'>
        {menuName.split('/').map((menu, index) => (
          <p key={index} className='reviewBox-menu'>
            {menu}
          </p>
        ))}
      </div>
    </>
  );
}
