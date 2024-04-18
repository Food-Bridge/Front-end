import React, { useState, useEffect } from 'react';
import './MyListProfile.scss';
import axiosInstance from '../../../api/instance';
import PlusInfo from '../PlusInfo/PlusInfo';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';
import ImageUploader from '../../../api/compress';
import { useGetId } from '../../../api/useGetId';

export default function MyListProfile({ handleLogout }) {
  const userId = useGetId();
  const [userNickname, setUserNickname] = useState("null")
  const [userImg, setUserImg] = useState(null)
  const [changeImg, setChangeImg] = useState(userImg)
  const [imageDisplay, setImageDisplay] = useState(null)
  const [changeNickname, setChangeNickname] = useState(userNickname)
  const [isEdit, setIsEdit] = useState(false);
  const [orderNum, setOrderNum] = useState(0);
  const [reviewNum, setReviewNum] = useState(0);
  const [likeNum, setLikeNum] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/users/profile/');
      setUserNickname(res.data.nickname)
      setUserImg(res.data.image)
      setImageDisplay(res.data.image)
      const orderRes = await axiosInstance.get('/order/');
      setOrderNum(orderRes.data.length);
      const reviewRes = await axiosInstance.get('/review/');
      setReviewNum(reviewRes.data.length);
      const likeRes = await axiosInstance.get('/like/');
      setLikeNum(likeRes.data.liked_restaurants_ids.length);
      setLoading(false)
    };
    fetchData();
  }, []);

  const onNicknameClick = () => {
    setIsEdit(!isEdit)
    setChangeNickname(userNickname)
    setImageDisplay(userImg)
  }

  const handleChangeNickname = async () => {
    try {
      const formData = new FormData();
      formData.append('user', userId);
      formData.append('nickname', changeNickname);
      if (changeImg)
        formData.append('image', changeImg);
      await axiosInstance.put('/users/profile/', formData);
      Swal.fire({
        icon: 'info',
        title: '프로필 변경',
        text: '프로필을 변경하였습니다.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      });
      setIsEdit(false);
      setUserNickname(changeNickname)
      setUserImg(imageDisplay)
    } catch {
      console.log("fail profile edit")
    }
  };

  return (
    <div className='mylistUser'>
      {loading && <Loading />}
      <div className='mylistUser-profile'>
        {isEdit ?
          <>
            <img
              className='mylistUser-profileImg'
              src={imageDisplay}
              alt='프로필이미지'
            />
            <div className='mylistUser-profileInput'>
              <ImageUploader
                size='1.5'
                setImage={setChangeImg}
                setImageDisplay={setImageDisplay}
                length='1000'
              />
            </div>
            <label htmlFor='file' className='mylistUser-profileBtn'>
              편집
            </label>
          </> :
          <img
            className='mylistUser-profileImg'
            src={userImg}
            alt='프로필이미지' />
        }
      </div>
      <div className='mylistUser-group'>
        <div className='mylistUser-id'>
          {isEdit ? (<>
            <input
              className='mylistUser-id-input'
              type='text'
              value={changeNickname}
              onChange={(e) => setChangeNickname(e.target.value)}
            />
            <div className='mylistUser-id-change' onClick={handleChangeNickname}>
              <PlusInfo text='저장' />
            </div>
            <div className='mylistUser-id-logout' onClick={onNicknameClick}>
              <PlusInfo text='취소' />
            </div>
          </>) : (<>
            <h1 className='mylistUser-id-name'>
              {userNickname || '닉네임'}
            </h1>
            <div className='mylistUser-id-change' onClick={onNicknameClick}>
              <PlusInfo text='프로필 수정' />
            </div>
            <div className='mylistUser-id-logout' onClick={handleLogout}>
              <PlusInfo text='로그아웃' />
            </div>
          </>)}
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
