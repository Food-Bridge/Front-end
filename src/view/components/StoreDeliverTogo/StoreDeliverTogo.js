import React, { useState } from 'react';
import PlusInfo from '../PlusInfo/PlusInfo';
import './StoreDelierTogo.scss';
import { useDispatch } from 'react-redux';
import { setPickUp, setDeliver } from '../../../redux/reducers/cartSlice';

export default function StoreDeliverTogo({ data }) {
  const dispatch = useDispatch();
  const [type, setType] = useState('deliver');

  if (type === 'deliver') {
    dispatch(setDeliver());
  } else {
    dispatch(setPickUp());
  }

  return (
    <div className='storeDeliverTogo'>
      <header className='storeDeliverTogo-header'>
        <button
          className={type === 'deliver' ? 'storeDeliverTogo-underline' : ''}
          onClick={() => setType('deliver')}
        >
          <h2 className='storeDeliverTogo-title'>배달</h2>
        </button>
        <button
          className={type === 'togo' ? 'storeDeliverTogo-underline' : ''}
          onClick={() => setType('togo')}
        >
          <h2 className='storeDeliverTogo-title'>포장</h2>
        </button>
      </header>

      {type === 'deliver' && (
        <div className='storeDeliverTogo-contents'>
          <div className='storeDeliverTogo-detail'>
            <h3 className='storeDeliverTogo-detailTitle'>예상 도착 시간</h3>
            <p className='storeDeliverTogo-detailContent'>
              {data.minDeliveryTimeMinutes}~{data.maxDeliveryTimeMinutes}분
            </p>
          </div>
          <div className='storeDeliverTogo-detail'>
            <h3 className='storeDeliverTogo-detailTitle'>최소 주문 금액</h3>
            <p className='storeDeliverTogo-detailContent'>
              {data.minimumOrderPrice
                ? data.minimumOrderPrice.toLocaleString('ko-KR') + '원'
                : ''}
            </p>
          </div>
          <div className='storeDeliverTogo-detail'>
            <h3 className='storeDeliverTogo-detailTitle'>배달비</h3>
            <p className='storeDeliverTogo-detailContent'>
              {data.delivertyFee}원
            </p>
          </div>
          <div className='storeDeliverTogo-info'>
            <PlusInfo text='매장정보' arrow='true' />
          </div>
        </div>
      )}
      {type === 'togo' && (
        <div className='storeDeliverTogo-contents'>
          <div className='storeDeliverTogo-detail'>
            <h3 className='storeDeliverTogo-detailTitle'>예상 픽업 시간</h3>
            <p className='storeDeliverTogo-detailContent'>
              {data.minPickupTime}분
            </p>
          </div>
          <div className='storeDeliverTogo-detail'>
            <h3 className='storeDeliverTogo-detailTitle'>최소 주문 금액</h3>
            <p className='storeDeliverTogo-detailContent'>
              {data.minimumPickupPrice}원
            </p>
          </div>
          <div className='storeDeliverTogo-detail'>
            <h3 className='storeDeliverTogo-detailTitle'>픽업 주소</h3>
            <p className='storeDeliverTogo-detailContent'>{data.address}</p>
          </div>
          <div className='storeDeliverTogo-info'>
            <PlusInfo text='매장정보' arrow='true' />
          </div>
        </div>
      )}
    </div>
  );
}
