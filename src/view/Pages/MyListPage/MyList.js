import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/authSlice'

import MyListBlock from '../../components/MyListBlock/MyListBlock';
import MyListDeliver from '../../components/MyListDeliver/MyListDeliver';
import MyListMain from '../../components/MyListMain/MyListMain';
import PlusInfo from '../../components/PlusInfo/PlusInfo';
import './MyList.scss';

import { CiDiscount1, CiGift } from 'react-icons/ci';
import { IoSettingsOutline } from 'react-icons/io5';
import { GoMegaphone } from 'react-icons/go';
import { RiQuestionAnswerLine, RiCustomerService2Fill } from 'react-icons/ri';

export default function MyList() {
  const navigate = useNavigate();
  const [image, setImage] = useState('')

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/profile/4/')
    .then(response => {
      console.log(response)
      setImage(response.data.image);
    })
    .catch(error => {
      console.error('Error fetching image:', error);
    });
  }, []);

  const onChangeImage = (event) => {
    const { files } = event.target;
    const uploadFile = files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);

    axios.put('http://127.0.0.1:8000/users/profile/4/', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(function (response) {
        setImage(response.data.image);
      })
      .catch(function (error) {
        console.error('Error uploading image:', error);
      });
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    axios
      .post('http://localhost:8000/users/logout/', {
        refresh: localStorage.getItem('refresh'),
        },{
          headers : {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          }
        })
      .then(function (response) {
        console.log(response);
        localStorage.removeItem('refresh');
        localStorage.removeItem('access');
        dispatch(logout());
        navigate('/users/signin/');
      });
  };

  const handleCoupon = () => {
    navigate('coupon/')
  }

  return (
    <div className='mylist'>
      <div className='mylistUser'>
        <div className='mylistUser-profile'>
          <img className='mylistUser-profileImg' src={image} />
          <input
            className='mylistUser-profileInput'
            id='file'
            type='file'
            accept='image/*'
            onChange={onChangeImage}
          />
          <label for='file' className='mylistUser-profileBtn'>
            편집
          </label>
        </div>
        <div className='mylistUser-group'>
          <div className='mylistUser-id'>
            <h1 className='mylistUser-id-name'>000님</h1>
            <p className='mylistUser-id-info'>test@gmail.com</p>
            <button onClick={handleLogout}>
              <PlusInfo className='mylistUser-id-logout' text='로그아웃' />
            </button>
          </div>
          <div className='mylistUser-detail'>
            <div className='mylistUser-detailBox'>
              <h2 className='mylistUser-detailBox-num'>123</h2>
              <p className='mylistUser-detailBox-title'>주문 내역</p>
            </div>
            <div className='mylistUser-detailBox'>
              <h2 className='mylistUser-detailBox-num'>34</h2>
              <p className='mylistUser-detailBox-title'>나의 리뷰</p>
            </div>
            <div className='mylistUser-detailBox'>
              <h2 className='mylistUser-detailBox-num'>54</h2>
              <p className='mylistUser-detailBox-title'>즐겨찾기</p>
            </div>
          </div>
        </div>
      </div>
      <MyListMain />
      <MyListDeliver />
      <div className='mylistBlocks-row'>
        <button onClick={handleCoupon}><MyListBlock icon={<CiDiscount1 size='35' />} text='할인쿠폰' /></button>
        <MyListBlock icon={<CiGift size='35' />} text='이벤트' />
        <MyListBlock icon={<IoSettingsOutline size='35' />} text='설정' />
      </div>
      <div className='mylistBlocks-row'>
        <MyListBlock icon={<GoMegaphone size='35' />} text='공지사항' />
        <MyListBlock
          icon={<RiQuestionAnswerLine size='35' />}
          text='자주 묻는 질문'
        />
        <MyListBlock
          icon={<RiCustomerService2Fill size='35' />}
          text='고객센터'
        />
      </div>
      <div className='mylistBanner' />
    </div>
  );
}
