import { useState } from 'react';
import PlusInfo from '../PlusInfo/PlusInfo';
import './StoreDelierTogo.scss';

export default function StoreDeliverTogo() {
  const [type, setType] = useState('deliver');

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
            <p className='storeDeliverTogo-detailContent'>24~34분</p>
          </div>
          <div className='storeDeliverTogo-detail'>
            <h3 className='storeDeliverTogo-detailTitle'>최소 주문 금액</h3>
            <p className='storeDeliverTogo-detailContent'>1,500원~2,000원</p>
          </div>
          <div className='storeDeliverTogo-detail'>
            <h3 className='storeDeliverTogo-detailTitle'>배달비</h3>
            <p className='storeDeliverTogo-detailContent'>15,000원</p>
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
            <p className='storeDeliverTogo-detailContent'>7~17분</p>
          </div>
          <div className='storeDeliverTogo-detail'>
            <h3 className='storeDeliverTogo-detailTitle'>최소 주문 금액</h3>
            <p className='storeDeliverTogo-detailContent'>없음</p>
          </div>
          <div className='storeDeliverTogo-detail'>
            <h3 className='storeDeliverTogo-detailTitle'>픽업 주소</h3>
            <p className='storeDeliverTogo-detailContent'>서울특별시 00구 00로 14-3(2층)</p>
          </div>
          <div className='storeDeliverTogo-info'>
            <PlusInfo text='매장정보' arrow='true' />
          </div>
        </div>
      )}
    </div>
  );
}
