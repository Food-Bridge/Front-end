import React, { useState, useEffect } from 'react';
import './MyListProfile.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfile, setProfile } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';
import PlusInfo from '../PlusInfo/PlusInfo';
import Swal from 'sweetalert2';

export default function MyListProfile({ onChangeImage, handleLogout }) {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const [isNicknameChange, setIsNicknameChange] = useState(false);
  const [orderNum, setOrderNum] = useState(0);
  const [reviewNum, setReviewNum] = useState(0);
  const [likeNum, setLikeNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/users/profile/');
      dispatch(
        setProfile({ image: res.data.image, nickname: res.data.nickname })
      );
      const orderRes = await axiosInstance.get('/order/');
      setOrderNum(orderRes.data.length);
      const reviewRes = await axiosInstance.get('/review/');
      setReviewNum(reviewRes.data.length);
      const likeRes = await axiosInstance.get('/like/');
      setLikeNum(likeRes.data.liked_restaurants_ids.length);
    };
    fetchData();
  }, []);

  const handleChangeNickname = async () => {
    setIsNicknameChange(!isNicknameChange);
    if (isNicknameChange) {
      const formData = new FormData();
      formData.append('nickname', profile.nickname);

      const res = await axiosInstance.put('/users/profile/', formData);
      dispatch(
        setProfile({ image: profile.image, nickname: res.data.nickname })
      );
      Swal.fire({
        icon: 'info',
        title: '프로필 변경',
        text: '프로필을 변경하였습니다.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      });
    }
  };

  return (
    <div className='mylistUser'>
      <div className='mylistUser-profile'>
        <img
          className='mylistUser-profileImg'
          src={profile.image}
          alt='프로필이미지'
        />
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
            <h1 className='mylistUser-id-name'>
              {profile.nickname || '닉네임'}
            </h1>
          )}
          <div className='mylistUser-id-change' onClick={handleChangeNickname}>
            <PlusInfo text={isNicknameChange ? '변경 완료' : '닉네임 변경'} />
          </div>
          <div className='mylistUser-id-logout' onClick={handleLogout}>
            <PlusInfo text='로그아웃' />
          </div>
        </div>
        <div className='mylistUser-detail'>
          <div className='mylistUser-detailBox'>
            <h2 className='mylistUser-detailBox-num'>{orderNum}</h2>
            <p className='mylistUser-detailBox-title'>주문 내역</p>
          </div>
          <div className='mylistUser-detailBox'>
            <h2 className='mylistUser-detailBox-num'>{reviewNum}</h2>
            <p className='mylistUser-detailBox-title'>나의 리뷰</p>
          </div>
          <div className='mylistUser-detailBox'>
            <h2 className='mylistUser-detailBox-num'>{likeNum}</h2>
            <p className='mylistUser-detailBox-title'>즐겨찾기</p>
          </div>
        </div>
      </div>
    </div>
  );
}
