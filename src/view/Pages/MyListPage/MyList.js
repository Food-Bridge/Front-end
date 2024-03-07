import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProfile,
  logout,
  setProfile,
} from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';
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
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const [isNicknameChange, setIsNicknameChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/users/profile/');
      dispatch(setProfile({ image: res.data.image, nickname: res.data.nickname }));
    };
    fetchData();
  }, [dispatch]);

  const onChangeImage = async (event) => {
    const { files } = event.target;
    const uploadFile = files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);
    formData.append('nickname', profile.nickname);

    const res = await axiosInstance.put('/users/profile/', formData);
    dispatch(setProfile({ image: res.data.image, nickname: profile.nickname }));
  };

  const handleChangeNickname = async () => {
    setIsNicknameChange(!isNicknameChange);
    if (isNicknameChange) {
      const formData = new FormData();
      formData.append('nickname', profile.nickname);

      const res = await axiosInstance.put('/users/profile/', formData);

      dispatch(setProfile({ image: profile.image, nickname: res.data.nickname }));
    }
  };

  const handleLogout = async () => {
    await axiosInstance.post('/users/logout/', {
      refresh: localStorage.getItem('refresh'),
    });

    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    dispatch(logout());
    navigate('/users/signin/');
  };

  const handleOpenCoupon = () => {
    navigate('coupon/');
  };

  return (
    <div className='mylist'>
      <div className='mylistUser'>
        <div className='mylistUser-profile'>
          <img className='mylistUser-profileImg' src={profile.image} />
          <input
            className='mylistUser-profileInput'
            id='file'
            type='file'
            accept='image/*'
            onChange={onChangeImage}
          />
          <label htmlFor='file' className='mylistUser-profileBtn'>
            편집
          </label>
        </div>
        <div className='mylistUser-group'>
          <div className='mylistUser-id'>
            {isNicknameChange ? (
              <input
                className='mylistUser-id-input'
                type='text'
                value={profile.nickname}
                onChange={(event) =>
                  dispatch(
                    setProfile({
                      image: profile.image,
                      nickname: event.target.value,
                    })
                  )
                }
              ></input>
            ) : (
              <h1 className='mylistUser-id-name'>{profile.nickname}</h1>
            )}
            <div
              className='mylistUser-id-change'
              onClick={handleChangeNickname}
            >
              <PlusInfo text={isNicknameChange ? '변경 완료' : '닉네임 변경'} />
            </div>
            <div className='mylistUser-id-logout' onClick={handleLogout}>
              <PlusInfo text='로그아웃' />
            </div>
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
        <div onClick={handleOpenCoupon}>
          <MyListBlock icon={<CiDiscount1 size='35' />} text='할인쿠폰' />
        </div>
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
