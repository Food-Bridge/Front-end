import React, { useState, useEffect } from 'react';
import './MyListProfile.scss'
import { useSelector, useDispatch } from 'react-redux';
import { selectProfile, setProfile } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';
import PlusInfo from '../PlusInfo/PlusInfo';

export default function MyListProfile({onChangeImage, handleLogout}) {
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

  const handleChangeNickname = async () => {
    setIsNicknameChange(!isNicknameChange);
    if (isNicknameChange) {
      const formData = new FormData();
      formData.append('nickname', profile.nickname);

      const res = await axiosInstance.put('/users/profile/', formData);
      dispatch(setProfile({ image: profile.image, nickname: res.data.nickname }));
    }
  };

  return (
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
            <h1 className='mylistUser-id-name'>{profile.nickname || '닉네임'}</h1>
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
  );
}
