import React, { useState } from 'react';
import PlusInfo from '../PlusInfo/PlusInfo';
import './StoreDeliverTogo.scss';
import { useDispatch } from 'react-redux';
import { setPickUp, setDeliver } from '../../../redux/reducers/cartSlice';
import Swal from 'sweetalert2';

export default function StoreDeliverTogo({ data }) {
  const dispatch = useDispatch();
  const [isDeliver, setIsDeliver] = useState(true);

  isDeliver ? dispatch(setDeliver()) : dispatch(setPickUp());

  const handleShowInfo = () => {
    Swal.fire({
      icon: 'info',
      title: '매장 정보',
      html: `매장 설명 : ${data.description}<br>
      매장 주소 : ${data.address}<br>
      매장 운영 시간 : ${data.start}시 ~ ${data.end}시<br>
      ${data.operatingTime}`,
      showCancelButton: false,
      confirmButtonText: '확인',
      confirmButtonColor: 'black'
    });
  };

  return (
    <div className='storeDeliverTogo'>
      <header className='storeDeliverTogo-header'>
        <button
          className={isDeliver ? 'storeDeliverTogo-underline' : ''}
          onClick={() => setIsDeliver(true)}
        >
          <h2 className='storeDeliverTogo-title'>배달</h2>
        </button>
        <button
          className={!isDeliver ? 'storeDeliverTogo-underline' : ''}
          onClick={() => setIsDeliver(false)}
        >
          <h2 className='storeDeliverTogo-title'>포장</h2>
        </button>
      </header>
      <div className='storeDeliverTogo-contents'>
        <div className='storeDeliverTogo-detail'>
          <h3 className='storeDeliverTogo-detailTitle'>
            {isDeliver ? '예상 도착 시간' : '예상 픽업 시간'}
          </h3>
          <p className='storeDeliverTogo-detailContent'>
            {isDeliver
              ? `${data.minDeliveryTimeMinutes}~${data.maxDeliveryTimeMinutes}분`
              : `${data.minPickupTime}분`}
          </p>
        </div>
        <div className='storeDeliverTogo-detail'>
          <h3 className='storeDeliverTogo-detailTitle'>최소 주문 금액</h3>
          <p className='storeDeliverTogo-detailContent'>
            {isDeliver
              ? data.minimumOrderPrice &&
                `${data.minimumOrderPrice.toLocaleString('ko-KR')}원`
              : data.minimumPickupPrice &&
                `${data.minimumPickupPrice.toLocaleString('ko-KR')}원`}
          </p>
        </div>
        <div className='storeDeliverTogo-detail'>
          <h3 className='storeDeliverTogo-detailTitle'>
            {isDeliver ? '배달비' : '픽업주소'}
          </h3>
          <p className='storeDeliverTogo-detailContent'>
            {isDeliver
              ? data.deliveryFee &&
                `${data.deliveryFee.toLocaleString('ko-KR')}원`
              : data.address}
          </p>
        </div>
        <div className='storeDeliverTogo-info'>
          <PlusInfo text='매장정보' arrow='true' onClick={handleShowInfo} />
        </div>
      </div>
    </div>
  );
}
