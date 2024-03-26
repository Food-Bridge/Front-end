import React, { useEffect, useState } from 'react';
import './ReviewBox.scss';

import { FaStar } from 'react-icons/fa';
import axiosInstance from '../../../api/instance';

export default function ReviewBox({ data,  myReview }) {
  const [userNickname, setUserNickname] = useState('')
  const [userImage, setUserImage] = useState('')

  useEffect(() => {
    const fetchData = async() =>{
      const res = await axiosInstance.get('/users/profile/')
      console.log(res)
      setUserNickname(res.data.nickname ? res.data.nickname : '닉네임')
      setUserImage(res.data.image)
    }
fetchData()
  }, [])

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
          <img className='reviewBox-profileImg' src={myReview ? data.restaurant_image : userImage} />
          <div className='reviewBox-profileContent'>
            <p className='reviewBox-profileName'>{myReview ? data.restaurnat_name : userNickname}</p>
            <p className='reviewBox-rate'>{rateStars}</p>
          </div>
        </div>
        <p className='reviewBox-date'>{formattedDate}</p>
      </header>
      <div className='reviewBox-content'>
        <img className='reviewBox-contentImg' src={data.image[0].image} />
        <p className='reviewBox-contentText'>{data.caption}.</p>
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
