import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './CartList.scss';
import { IoGiftOutline } from '@react-icons/all-files/io5/IoGiftOutline';
import { FaTruck } from '@react-icons/all-files/fa/FaTruck';
import PaymentMenu from '../../components/PaymentMenu/PaymentMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectAddresses,
  selectDefaultId,
} from '../../../redux/reducers/addressSlice';
import axiosInstance from '../../../api/instance';
import {
  deleteMenu,
  selectIsDeliver,
  selectMenu,
  selectMenuImg,
  selectStore,
  setCurrentStore,
  setDeliver,
  setMenuData,
  setMenuImg,
  setPickUp,
} from '../../../redux/reducers/cartSlice';
import Loading from '../../components/Loading/Loading';

export default function CartList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const address = useSelector(selectAddresses);
  const defaultId = useSelector(selectDefaultId);
  const isDeliver = useSelector(selectIsDeliver);
  const menu = useSelector(selectMenu);
  const resData = useSelector(selectStore);
  const [restaurant, setRestaurant] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/cart/');
      setRestaurant(res.data.restaurant);
      dispatch(setMenuImg(res.data.menu_image))
      dispatch(setMenuData(res.data.cart_list));      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!restaurant) return;
    const cachedData = JSON.parse(localStorage.getItem('cachedData')) || {};
    const fetchResData = async () => {
      const res = await axiosInstance.get(`/restaurant/${restaurant}/`);
      dispatch(setCurrentStore(res.data));
    };
    if (!cachedData[restaurant]) {
      fetchResData();
    } else {
      const cachedResData = Object.values(cachedData).find(
        (item) => item.id === parseInt(restaurant)
      );
      dispatch(setCurrentStore(cachedResData));
    }
  }, [dispatch, restaurant]);

  useEffect(() => {
    if (resData && menu && menu.length > 0) {
      setTotalValue(
        menu.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
      setDeliveryFee(resData.deliveryFee ? resData.deliveryFee : 0);
    }
  }, [menu, resData]);

  const totalPrice = totalValue + deliveryFee;
  const [deliverClass, setDeliverClass] = useState('cartlist-selectBtn');
  const [pickUpClass, setPickUpClass] = useState('cartlist-selectBtn');

  useEffect(() => {
    if (isDeliver) {
      setDeliverClass('cartlist-selectBtn selected');
      setPickUpClass('cartlist-selectBtn');
    } else {
      setDeliverClass('cartlist-selectBtn');
      setPickUpClass('cartlist-selectBtn selected');
    }
  }, [isDeliver]);

  const handleDeliver = () => {
    dispatch(setDeliver());
  };

  const handlePickUp = () => {
    dispatch(setPickUp());
  };

  const deleteCartData = async () => {
    await axiosInstance.delete('/cart/');
    dispatch(deleteMenu());
  };

  const handleAddCart = async (updatedMenu) => {
    await axiosInstance.post('/cart/', {
      cart_list: updatedMenu,
      restaurant: restaurant,
      total_price: totalValue + deliveryFee,
    });
    dispatch(setMenuData(updatedMenu));
  };

  const handleDeleteMenuAll = () => {
    Swal.fire({
      icon: 'warning',
      title: '전체 삭제',
      html: '모든 메뉴를 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      confirmButtonColor: '#ca0000',
      cancelButtonColor: 'black',
    }).then(async (res) => {
      res.isConfirmed && deleteCartData();
    });
  };

  const handleDeleteMenu = (indexToDelete) => {
    const updatedMenu = menu.filter((_, index) => index !== indexToDelete);
    updatedMenu.length > 0 ? handleAddCart(updatedMenu) : deleteCartData();
  };

  const handleIncreaseQuantity = (index) => {
    const updatedMenu = [...menu];
    updatedMenu[index] = {
      ...updatedMenu[index],
      quantity: updatedMenu[index].quantity + 1,
    };
    handleAddCart(updatedMenu);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedMenu = [...menu];

    if (menu[index].quantity === 1) {
      handleDeleteMenu(index);
    } else {
      updatedMenu[index] = {
        ...updatedMenu[index],
        quantity: updatedMenu[index].quantity - 1,
      };
      handleAddCart(updatedMenu);
    }
  };

  const handleGoToPay = () => {
    if (totalValue >= resData.minimumOrderPrice) {
      if (address.length > 0 && defaultId) {
        navigate('/payment/');
      } else {
        Swal.fire({
          icon: 'info',
          title: '알림',
          html: '결제를 위해 주소를 등록해주세요.<br>기본 주소를 설정해주세요.',
          showCancelButton: false,
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        }).then((res) => {
          res.confirmed && navigate('/users/address/');
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: '알림',
        html: '총 주문 금액이 최소 주문 금액 보다 적습니다.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      });
    }
  };

  const handleGoToStore = () => {
    navigate('/restaurant/');
  };

  const handleClickAdd = () => {
    navigate(`/restaurant/${restaurant}/`);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <h1 className='cartlist-header'>주문하기</h1>
      {menu && !isNaN(totalPrice) ? (
        <div className='cartlist-list'>
          <div className='cartlist-info'>
            <div className='cartlist-store'>
              <img
                className='cartlist-storeImg'
                src={resData && resData.image}
                alt='매장 이미지'
              />
              <h2 className='cartlist-storeName'>{resData && resData.name}</h2>
            </div>
            <div className='cartlist-deliver'>
              {isDeliver ? <FaTruck size='24' /> : <IoGiftOutline size='24' />}
              <h2 className='cartlist-deliverTime'>
                {isDeliver
                  ? `${resData && resData.minDeliveryTimeMinutes}~${
                      resData && resData.maxDeliveryTimeMinutes
                    }분 후 도착 예정`
                  : `${resData && resData.minPickupTime}분 후 픽업 가능`}
              </h2>
            </div>
          </div>
          <div className='cartlist-buttons'>
            <div className='cartlist-deliverTogo'>
              <button className={deliverClass} onClick={handleDeliver}>
                배달
              </button>
              <button className={pickUpClass} onClick={handlePickUp}>
                포장
              </button>
            </div>
            <button
              className='cartlist-deleteBtn'
              onClick={handleDeleteMenuAll}
            >
              전체 삭제
            </button>
          </div>
          <div className='cartlist-menu'>
            {menu &&
              menu.map((item, index) => {
                return (
                  <PaymentMenu
                    key={index}
                    item={item}
                    index={index}
                    onDelete={handleDeleteMenu}
                    onIncrease={handleIncreaseQuantity}
                    onDecrease={handleDecreaseQuantity}
                  />
                );
              })}
          </div>
          <div className='cartlist-add'>
            <button className='cartlist-addBtn' onClick={handleClickAdd}>
              + 메뉴 추가하기
            </button>
          </div>
          {isDeliver && (
            <div className='cartlist-priceGroup'>
              <div className='cartlist-price'>
                <h2 className='cartlist-title'>총 주문 금액</h2>
                <p className='cartlist-value'>
                  {totalValue.toLocaleString('ko-KR')}원
                </p>
              </div>

              <div className='cartlist-price'>
                <h2 className='cartlist-title'>배달 팁</h2>
                <p className='cartlist-value'>
                  {deliveryFee.toLocaleString('ko-KR')}원
                </p>
              </div>
            </div>
          )}
          <div className='cartlist-priceGroup'>
            <div className='cartlist-price'>
              <h2 className='cartlist-title'>결제 예정 금액</h2>
              <p className='cartlist-value'>
                {isDeliver
                  ? totalPrice.toLocaleString('ko-KR')
                  : totalValue.toLocaleString('ko-KR')}
                원
              </p>
            </div>
          </div>
          <button className='cartlist-orderBtn' onClick={handleGoToPay}>
            {totalPrice.toLocaleString('ko-KR')}원 {isDeliver ? '배달' : '포장'}
            결제하기
          </button>
        </div>
      ) : (
        <div className='cartlist-nothing'>
          <h1 className='cartlist-nothingText'>장바구니에 메뉴가 없습니다.</h1>
          <button className='cartlist-nothingBtn' onClick={handleGoToStore}>
            음식점 둘러보기
          </button>
        </div>
      )}
    </>
  );
}
