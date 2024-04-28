import React, { useEffect, useState } from 'react';
import './CartAddBtn.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import axiosInstance from '../../../api/instance';

const CartAddBtn = ({ menuData, data, isRequiredCount }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const deliveryFee = data.deliveryFee ? data.deliveryFee : 0;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/cart/');
      setMenu(res.data.cart_list ? res.data.cart_list : []);
      setRestaurant(res.data.restaurant ? res.data.restaurant : 0);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      const totalValue =
        menu && menu.reduce((acc, item) => acc + item.price * item.quantity, 0);
      await axiosInstance.post('/cart/', {
        restaurant: data.id,
        cart_list: menu,
        total_price: totalValue + deliveryFee,
      });
    };
    menu.length > 0 && fetchCartData();
  }, [menu, deliveryFee, data.id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddCart = () => {
    const deleteCartData = async () => {
      await axiosInstance.delete('/cart/');
    };

    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: '알림',
        text: '로그인이 필요합니다.',
        showCancelButton: false,
        confirmButtonText: '로그인하기',
        confirmButtonColor: 'black',
      }).then((res) => res.isConfirmed && navigate('/users/signin'));
    } else if (!isRequiredCount) {
      Swal.fire({
        icon: 'warning',
        title: '알림',
        text: '필수 옵션을 다시 확인해주세요.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      });
    } else {
      if (menu && menu.length > 0 && restaurant === menuData.restaurant) {
        const existingMenuItem = menu.find(
          (item) =>
            item.menu_id === menuData.menu_id &&
            arraysEqual(item.option_list, menuData.option_list) &&
            arraysEqual(item.sOption_list, menuData.sOption_list)
        );
        if (existingMenuItem !== undefined) {
          const updatedMenu = menu.map((item) =>
            item.menu_id === existingMenuItem.menu_id &&
            item.option_list === existingMenuItem.option_list &&
            item.sOption_list === existingMenuItem.sOption_list
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          setMenu(updatedMenu);
        } else {
          setMenu([...menu, { ...menuData, quantity }]);
        }
        navigate(-1);
      } else {
        if (menu && menu.length > 0) {
          Swal.fire({
            icon: 'warning',
            title: '알림',
            html: '장바구니에는 같은 가게의 메뉴만 담을 수 있습니다.<br>기존에 담은 메뉴를 삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            confirmButtonColor: '#ca0000',
            cancelButtonColor: 'black',
          }).then((res) => {
            if (res.isConfirmed) {
              deleteCartData();
            }
          });
        } else {
          setMenu([{ ...menuData, quantity: quantity }]);
          navigate(-1);
        }
      }
    }
  };

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  return (
    <div>
      <div className='cartAddBtn'>
        <div className='cartAddBtn-quantityGroup'>
          <div className='cartAddBtn-quantity'>
            <button className='cartAddBtn-minus' onClick={decreaseQuantity}>
              -
            </button>
            <p className='cartAddBtn-quantityNum'>{quantity}</p>
            <button className='cartAddBtn-plus' onClick={increaseQuantity}>
              +
            </button>
          </div>
          <div className='cartAddBtn-least'>
            <h1 className='cartAddBtn-leastTitle'>최소 주문 금액</h1>
            <p className='cartAddBtn-leastPrice'>
              {data.minimumOrderPrice
                ? data.minimumOrderPrice.toLocaleString('ko-KR') + '원'
                : ''}
            </p>
          </div>
        </div>

        <button className='cartAddBtn-add' onClick={handleAddCart}>
          {(menuData.price * quantity).toLocaleString('ko-KR')}원 담기
        </button>
      </div>
    </div>
  );
};

export default CartAddBtn;
