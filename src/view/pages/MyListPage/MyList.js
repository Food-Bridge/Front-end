import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProfile,
  setProfile,
  deleteTokens,
  logout,
} from '../../../redux/reducers/authSlice';
import {
  updateAddresses,
  setDefaultId,
} from '../../../redux/reducers/addressSlice';
import {
  setMenuData,
  setCurrentStore,
} from '../../../redux/reducers/cartSlice';
import axiosInstance from '../../../api/instance';
import MyListBlock from '../../components/MyListBlock/MyListBlock';
import MyListDeliver from '../../components/MyListDeliver/MyListDeliver';
import MyListMain from '../../components/MyListMain/MyListMain';
import './MyList.scss';
import MyListProfile from '../../components/MyListProfile/MyListProfile';
import Swal from 'sweetalert2';

import { CiDiscount1, CiGift } from 'react-icons/ci';
import { IoSettingsOutline } from 'react-icons/io5';
import { GoMegaphone } from 'react-icons/go';
import { RiQuestionAnswerLine, RiCustomerService2Fill } from 'react-icons/ri';
import { selectDeliverList } from '../../../redux/reducers/deliverSlice';

export default function MyList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const deliverList = useSelector(selectDeliverList);
  const onChangeImage = async (event) => {
    const { files } = event.target;
    const uploadFile = files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);
    profile.nickname && formData.append('nickname', profile.nickname);

    const res = await axiosInstance.patch('/users/profile/', formData);
    dispatch(setProfile({ image: res.data.image, nickname: profile.nickname }));
    Swal.fire({
      icon: 'info',
      title: '프로필 변경',
      text: '프로필을 변경하였습니다.',
      showCancelButton: false,
      confirmButtonText: '확인',
      confirmButtonColor: 'black',
    });
  };
  const handleLogout = async () => {
    await axiosInstance.post('/users/logout/', {
      refresh: sessionStorage.getItem('refreshToken'),
    });
    dispatch(logout());
    dispatch(deleteTokens());
    dispatch(setCurrentStore([]));
    dispatch(setMenuData([]));
    dispatch(setDefaultId(null));
    dispatch(updateAddresses([]));
    Swal.fire({
      icon: 'success',
      title: '로그아웃',
      text: '성공적으로 로그아웃 되었습니다.',
      showCancelButton: false,
      confirmButtonText: '확인',
      confirmButtonColor: 'black',
    });
    navigate('/users/signin/');
  };

  const handleOpenCoupon = () => {
    navigate('/users/coupon/');
  };

  const handleClickButton = () => {
    Swal.fire({
      icon: 'info',
      title: '알림',
      text: '추후 업데이트 예정입니다.',
      showCancelButton: false,
      confirmButtonText: '확인',
      confirmButtonColor: 'black',
    });
  };

  return (
    <div className='mylist'>
      <MyListProfile
        onChangeImage={onChangeImage}
        handleLogout={handleLogout}
      />
      <MyListMain />
      {deliverList.length > 0 &&
        deliverList.map(
          (data) =>
            data.showMyListDeliver && (
              <MyListDeliver data={data} key={data.id} />
            )
        )}
      <div className='mylistBlocks-row'>
        <MyListBlock
          icon={<CiDiscount1 size='35' />}
          text='할인쿠폰'
          press={handleOpenCoupon}
        />
        <MyListBlock
          icon={<CiGift size='35' />}
          text='이벤트'
          press={handleClickButton}
        />
        <MyListBlock
          icon={<IoSettingsOutline size='35' />}
          text='설정'
          press={handleClickButton}
        />
      </div>
      <div className='mylistBlocks-row'>
        <MyListBlock
          icon={<GoMegaphone size='35' />}
          text='공지사항'
          press={handleClickButton}
        />
        <MyListBlock
          icon={<RiQuestionAnswerLine size='35' />}
          text='자주 묻는 질문'
          press={handleClickButton}
        />
        <MyListBlock
          icon={<RiCustomerService2Fill size='35' />}
          text='고객센터'
          press={handleClickButton}
        />
      </div>
    </div>
  );
}
