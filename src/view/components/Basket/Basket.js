import React from 'react';
import './Basket.scss';

import { CiShoppingBasket } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../redux/reducers/cartSlice';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import Swal from 'sweetalert2'

export default function Basket() {
  const navigate = useNavigate();
  const menu = useSelector(selectMenu);
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const count = menu.length;

  const handleOpenBasket = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        text: '알림',
        text: '로그인이 필요합니다.',
        showCancelButton: false,
        confirmButtonText: '로그인하기',
        confirmButtonColor: 'black',
      }).then((res) => res.isConfirmed && navigate('/users/signin'));
    } else {
      navigate('/cart/');
    }
  };

  return (
    <button className='basket' onClick={handleOpenBasket}>
      <CiShoppingBasket className='basket-icon' />
      <div className='basket-count'>
        <h1 className='basket-text'>{count}</h1>
      </div>
    </button>
  );
}
