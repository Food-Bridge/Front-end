import React, { useEffect, useState } from 'react';
import './Basket.scss';

import { IoMdBasket } from '@react-icons/all-files/io/IoMdBasket';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import Swal from 'sweetalert2';
import axiosInstance from '../../../api/instance';

export default function Basket() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const count = menu ? menu.length : 0;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/cart/');
      setMenu(res.data.cart_list);
    };
    fetchData();
  }, []);

  const handleOpenBasket = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: '알림',
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
    <button className='basket' onClick={handleOpenBasket} aria-label='장바구니'>
      <IoMdBasket className='basket-icon' />
      <div className='basket-count'>
        <h1 className='basket-text'>{count}</h1>
      </div>
    </button>
  );
}
