import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.scss';
import { SlPresent } from 'react-icons/sl';
import { MdOutlineHouse } from 'react-icons/md';
import { CiDeliveryTruck } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMenu,
  selectStore,
  selectIsDeliver,
} from '../../../redux/reducers/cartSlice';
import PaymentMethod from '../../components/PaymentMethod/PaymentMethod';
import {
  selectAddresses,
  selectDefaultId,
} from '../../../redux/reducers/addressSlice';
import axiosInstance from '../../../api/instance';

export default function Payment() {
  const navigate = useNavigate();
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('01012341234');
  const [storeRequest, setStoreRequest] = useState('');
  const [disposable, setDisposable] = useState(false);
  const [deliverRequest, setDeliverRequest] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const isDeliver = useSelector(selectIsDeliver);
  const store = useSelector(selectStore);
  const menuData = useSelector(selectMenu);
  const defaultId = useSelector(selectDefaultId);
  const address = useSelector(selectAddresses);
  const defaultAddress = address.find((address) => address.id === defaultId);

  const menuList = [];
  const optionList = [];

  menuData.forEach((menu) => {
    const menuInfo = {
      menu_id: menu.id,
      menu_name: menu.name,
      price: menu.price,
      quantity: menu.quantity,
    };
    menuList.push(menuInfo);

    const optionInfo = menu.options.map((option) => ({
      option_id: option.id,
      option_name: option.name,
      price: option.price,
      quantity: option.quantity,
    }));
    optionList.push(optionInfo);
  });
  console.log(menuData);
  console.log(optionList);
  const totalValue = menuData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = store.deliveryFee ? store.deliveryFee : 0;
  const totalPrice = totalValue + deliveryFee;
  const handlePostPayment = () => {
    axiosInstance.post('/order/', {
      required_options_count: store.required_options_count,
      menu_list: menuData,
      option_list: menuData,
      total_price: totalPrice,
      coupon_code: '',
      deliver_address: defaultAddress.detail_address,
      deliveryman_request: deliverRequest,
      is_deliver: isDeliver,
      payment_method: paymentMethod,
      restaurant: store.id,
      order_State: 'order_complete',
    });
  };
  return (
    <>
      <h1 className='payment-header'>결제하기</h1>
      <div className='payment-list'>
        <div className='payment-info'>
          <div className='payment-store'>
            <img className='payment-storeImg' src={store.image} />
            <h2 className='payment-storeName'>{store.name}</h2>
          </div>
          <div className='payment-deliver'>
            {isDeliver ? (
              <CiDeliveryTruck size='30' />
            ) : (
              <SlPresent size='20' />
            )}
            <h2 className='payment-deliverTime'>
              {isDeliver
                ? `${store.minDeliveryTimeMinutes}~${store.maxDeliveryTimeMinutes}분 후 도착 예정`
                : `${store.minPickupTime}분 후 픽업 가능`}
            </h2>
          </div>
        </div>
        <div className='payment-userInfoGroup'>
          <div className='payment-addressGroup'>
            <div className='payment-addressGroup-header'>
              <h3 className='payment-addressNickname'>
                <MdOutlineHouse size='20' />{' '}
                {defaultAddress.nickname
                  ? defaultAddress.nickname
                  : defaultAddress.detail_address}
              </h3>
              <button
                className='payment-addressEdit'
                onClick={() => navigate('/users/address/')}
              >
                변경
              </button>
            </div>
            <h3 className='payment-addressName'>
              {defaultAddress.detail_address}
            </h3>
          </div>
          <div className='payment-phoneGroup'>
            {isPhoneEdit ? (
              <input
                className='payment-phoneEditInput'
                type='number'
                placeholder='숫자만 입력해주세요.'
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              <div className='payment-phone'>
                {phoneNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')}
              </div>
            )}
            <button
              className='payment-phoneEdit'
              onClick={() => setIsPhoneEdit(!isPhoneEdit)}
            >
              {isPhoneEdit ? '수정' : '변경'}
            </button>
          </div>
        </div>
        <div className='payment-requestGroup'>
          <div className='payment-storeRequest'>
            <h3 className='payment-storeRequest-title'>가게 요청사항</h3>
            <input
              className='payment-storeRequest-input'
              placeholder='예) 소스는 따로 담아주세요.'
              onChange={(e) => setStoreRequest(e.target.value)}
            />
            <div className='payment-disposable'>
              <input
                className='payment-checkbox'
                type='checkbox'
                onChange={() => setDisposable(!disposable)}
              ></input>
              <p className='payment-disposableText'>일회용 수저, 포크 받기</p>
            </div>
          </div>
          <div className='payment-deliverRequest'>
            <h3 className='payment-deliverRequest-title'>배달 요청사항</h3>
            <input
              className='payment-deliverRequest-input'
              placeholder='예) 문 앞에 놔주세요.'
              onChange={(e) => setDeliverRequest(e.target.value)}
            />
          </div>
        </div>
        <div className='payment-method'>
          <PaymentMethod />
        </div>
        {isDeliver && (
          <div className='payment-priceGroup'>
            <div className='payment-price'>
              <h2 className='payment-title'>총 주문 금액</h2>
              <p className='payment-value'>
                {totalValue.toLocaleString('ko-KR')}원
              </p>
            </div>

            <div className='payment-price'>
              <h2 className='payment-title'>배달 팁</h2>
              <p className='payment-value'>
                {deliveryFee.toLocaleString('ko-KR')}원
              </p>
            </div>
          </div>
        )}
        <div className='payment-priceGroup'>
          <div className='payment-price'>
            <h2 className='payment-title'>결제 예정 금액</h2>
            <p className='payment-value'>
              {totalPrice.toLocaleString('ko-KR')}원
            </p>
          </div>
        </div>
        <button className='payment-orderBtn'>
          {totalPrice.toLocaleString('ko-KR')}원 {isDeliver ? '배달' : '포장'}
          결제하기
        </button>
      </div>
    </>
  );
}
