import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProfile,
  setProfile,
  deleteTokens,
  selectIsSeller,
  logout,
} from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';
import MyListBlock from '../../components/MyListBlock/MyListBlock';
import MyListDeliver from '../../components/MyListDeliver/MyListDeliver';
import MyListMain from '../../components/MyListMain/MyListMain';
import './MyList.scss';

import { CiDiscount1, CiGift } from 'react-icons/ci';
import { IoSettingsOutline } from 'react-icons/io5';
import { GoMegaphone } from 'react-icons/go';
import { RiQuestionAnswerLine, RiCustomerService2Fill } from 'react-icons/ri';
import MyListProfile from '../../components/MyListProfile/MyListProfile';

export default function MyList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const isSeller = useSelector(selectIsSeller);

  const onChangeImage = async (event) => {
    const { files } = event.target;
    const uploadFile = files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);
    formData.append('nickname', profile.nickname);

    const res = await axiosInstance.put('/users/profile/', formData);
    dispatch(setProfile({ image: res.data.image, nickname: profile.nickname }));
  };

  const handleLogout = async () => {
    await axiosInstance.post('/users/logout/', {
      refresh: sessionStorage.getItem('refreshToken'),
    });
    dispatch(logout());
    dispatch(deleteTokens())
    navigate('/users/signin/');
  };

  const handleOpenCoupon = () => {
    navigate('coupon/');
  };

  return (
    <div className='mylist'>
      <MyListProfile
        onChangeImage={onChangeImage}
        handleLogout={handleLogout}
      />
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
