import React, { useState, useEffect } from 'react';
import './CartList.scss';
import { SlPresent } from "react-icons/sl";
import { CiDeliveryTruck } from 'react-icons/ci';
import PaymentMenu from '../../components/PaymentMenu/PaymentMenu';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsMenuIn,
  selectMenu,
  selectStore,
  selectIsDeliver,
  setDeliver,
  setPickUp,
  deleteMenu,
  setMenuData,
} from '../../../redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function CartList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMenuIn = useSelector(selectIsMenuIn);
  const isDeliver = useSelector(selectIsDeliver);
  const store = useSelector(selectStore);
  const menu = useSelector(selectMenu);

  const totalValue = menu.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  const deliveryFee = store.delivery_fee ? store.delivery_fee : 0;
  const totalPrice = totalValue + deliveryFee
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

  const handleDeleteMenuAll = () => {
    dispatch(deleteMenu());
  };

  const handleDeleteMenu = (indexToDelete) => {
    const updatedMenu = menu.filter(( index) => index !== indexToDelete);
    updatedMenu.length > 0
      ? dispatch(setMenuData(updatedMenu))
      : dispatch(deleteMenu());
  };

  const handleIncreaseQuantity = (index) => {
    const updatedMenu = [...menu];
    updatedMenu[index] = {
      ...updatedMenu[index],
      quantity: updatedMenu[index].quantity + 1,
    };
    dispatch(setMenuData(updatedMenu));
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
      dispatch(setMenuData(updatedMenu));
    }
  };

  const handleGoToStore = () => {
    navigate('/restaurant/');
  };

  const handleClickAdd = () => {
    navigate(`/restaurant/${store.id}/`);
  };
  console.log(store);
  return (
    <>
      <h1 className='cartlist-header'>주문하기</h1>
      {isMenuIn ? (
        <div className='cartlist-list'>
          <div className='cartlist-info'>
            <div className='cartlist-store'>
              <img className='cartlist-storeImg' src={store.image} />
              <h2 className='cartlist-storeName'>{store.name}</h2>
            </div>
            <div className='cartlist-deliver'>
              {isDeliver ? <CiDeliveryTruck size='30' /> : <SlPresent size='20' />}
              <h2 className='cartlist-deliverTime'>
                {isDeliver ? `${store.minDeliveryTimeMinutes}~${store.maxDeliveryTimeMinutes}분 후 도착 예정` : `${store.minPickupTime}분 후 픽업 가능`}
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
            {menu.map((item, index) => {
              return (
                <PaymentMenu
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
              <p className='cartlist-value'>{totalPrice.toLocaleString('ko-KR')}원</p>
            </div>
          </div>
          <button className='cartlist-orderBtn'>
            {totalPrice.toLocaleString('ko-KR')}원 {isDeliver ? '배달' : '포장'} 결제하기
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
