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
  deleteMenu,
} from '../../../redux/reducers/cartSlice';
import PaymentMethod from '../../components/PaymentMethod/PaymentMethod';
import {
  selectAddresses,
  selectDefaultId,
} from '../../../redux/reducers/addressSlice';
import axiosInstance from '../../../api/instance';
import { RiArrowDropDownFill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import {
  selectDeliverInfo,
  setCreated,
  setDeliverTime,
  setPrepareTime,
  setRestaurantName,
  setShowMyListDeliver,
} from '../../../redux/reducers/deliverSlice';

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storeRequest, setStoreRequest] = useState('');
  const [disposable, setDisposable] = useState(false);
  const [deliverRequest, setDeliverRequest] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [couponData, setCouponData] = useState([]);
  const [couponList, showCouponList] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState({ discount_price: 0 });
  const isDeliver = useSelector(selectIsDeliver);
  const store = useSelector(selectStore);
  const menuData = useSelector(selectMenu);
  const defaultId = useSelector(selectDefaultId);
  const address = useSelector(selectAddresses);
  const defaultAddress = address.find((address) => address.id === defaultId);
  const menuList = [];
  const optionLists = [];

  menuData.forEach((menu) => {
    const menuInfo = {
      menu_id: menu.id,
      menu_name: menu.name,
      price: menu.price,
      quantity: menu.quantity,
    };
    menuList.push(menuInfo);

    const optionList = menu.options.map((option) => ({
      option_id: option.id,
      option_name: option.name,
      price: option.price,
      quantity: 1,
    }));
    optionLists.push(optionList);

    const sOptionList =
      menu.sOption.length > 0
        ? menu.sOption.map((option) => ({
            option_id: option.id,
            option_name: option.name,
            price: option.price,
            quantity: 1,
          }))
        : [];
    optionLists.push(sOptionList);
  });

  const totalValue = menuData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = store.deliveryFee ? store.deliveryFee : 0;
  const totalPrice = totalValue + deliveryFee - selectedCoupon.discount_price;

  const handleClickCoupon = (el) => {
    setSelectedCoupon(el);
    showCouponList(false);
  };

  useEffect(() => {
    const fetchCoupon = async () => {
      const res = await axiosInstance.get('/userscoupon/');
      setCouponData(res.data);
    };
    fetchCoupon();
  }, []);

  const handlePostPayment = async () => {
    const data = {
      menu_list: menuList,
      option_list: optionLists[0],
      soption_list: optionLists[1],
      total_price: totalPrice,
      coupon_code: selectedCoupon.coupon_code,
      deliver_address: defaultAddress.detail_address,
      deliveryman_request: deliverRequest,
      restaurant_request: storeRequest,
      disposable_request: disposable,
      is_deliver: isDeliver,
      payment_method: paymentMethod,
      restaurant: store.id,
      order_state: 'order_complete',
    };
    await axiosInstance.post('/order/', data).then((res) => {
      if (res.data.is_deliver) {
        const prepareTime = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        dispatch(setRestaurantName(res.data.restaurant_name));
        dispatch(setCreated(res.data.created_at));
        dispatch(setDeliverTime(res.data.estimate_time));
        dispatch(setPrepareTime(prepareTime));
        dispatch(setShowMyListDeliver(true));
      }
      Swal.fire({
        icon: 'success',
        title: '결제 완료',
        html: '결제가 성공적으로 이루어졌습니다.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      }).then((res) => {
        dispatch(deleteMenu());
        res.isConfirmed && navigate('/');
      });
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
        {isDeliver && (
          <div className='payment-userInfoGroup'>
            <div className='payment-addressGroup'>
              <div className='payment-addressGroup-header'>
                <h3 className='payment-addressNickname'>
                  <MdOutlineHouse size='20' />
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
          </div>
        )}
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
          <PaymentMethod click={setPaymentMethod} selected={paymentMethod} />
          <div className='payment-coupon'>
            <h3 className='payment-couponTitle'>쿠폰 사용</h3>
            <button
              className='payment-couponCodeBox'
              onClick={() => showCouponList(!couponList)}
            >
              <p className='payment-couponCode'>
                {selectedCoupon.coupon_code
                  ? selectedCoupon.coupon_code
                  : '쿠폰을 선택해주세요.'}
              </p>
              <p className='payment-couponBtn'>
                <RiArrowDropDownFill size='20' />
              </p>
            </button>
            {couponList && (
              <div className='payment-couponList'>
                {couponData.filter(
                  (el) => el.minimum_order_price <= totalValue + deliveryFee
                ).length > 0 ? (
                  couponData
                    .filter(
                      (el) => el.minimum_order_price <= totalValue + deliveryFee
                    )
                    .map((el) => (
                      <button key={el.id} onClick={() => handleClickCoupon(el)}>
                        {el.coupon_code}
                      </button>
                    ))
                ) : (
                  <div>
                    <p>사용할 수 있는 쿠폰이 없습니다.</p>
                    <button
                      className='payment-couponDownload'
                      onClick={() => navigate('/users/coupon/')}
                    >
                      쿠폰 다운로드하러 가기
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
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
            <div className='payment-price'>
              <h2 className='payment-title'>쿠폰 할인</h2>
              <p className='payment-value'>
                {selectedCoupon.discount_price.toLocaleString('ko-KR')}원
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
        <button onClick={handlePostPayment} className='payment-orderBtn'>
          {totalPrice.toLocaleString('ko-KR')}원 {isDeliver ? '배달' : '포장'}
          결제하기
        </button>
      </div>
    </>
  );
}
