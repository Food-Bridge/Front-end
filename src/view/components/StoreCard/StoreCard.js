import React from 'react';
import './StoreCard.scss';
import { IoIosStar } from 'react-icons/io';

function StoreCard({
  className,
  img,
  storeName,
  minimumPrice,
  deliverPrice,
  storeScore,
}) {
  return (
    <div className={className}>
      <div className='storeCard-frame'>
        <div className='storeCard-imgFrame'>
          <div className='storeCard-imgBlock1'>
            <img src={img} alt='img' className='storeCard-img1' />
          </div>
          <div className='storeCard-imgFrame2'>
            <div className='storeCard-imgBlock2'>
              <img src={img} alt='img' className='storeCard-imgBlock2' />
            </div>
            <div className='storeCard-imgBlock3'>
              <img src={img} alt='img' className='storeCard-imgBlock3' />
            </div>
          </div>
        </div>
        <div className='storeCard-textFrame'>
          <div className='storeCard-storeInfo1'>
            <div className='storeCard-storeName'>{storeName}</div>
            <div className='storeCard-storeScore'>
              <IoIosStar className='storeCard-starIcon' />
              &nbsp;{storeScore}
            </div>
          </div>
          <div className='storeCard-storeInfo2'>
            <div className='storeCard-leastPrice'>
              <p className='storeCard-leastTitle'>최소주문금액 &nbsp;</p>
              <p className='storeCard-leastCount'>
                &nbsp;{minimumPrice.toLocaleString('ko-KR')}원&nbsp;&nbsp;
              </p>
            </div>
            <div className='storeCard-deliverPrice'>
              <p className='storeCard-deliverTitle'>배달팁 &nbsp;</p>
              <p className='storeCard-deliverCount'>
                &nbsp;{deliverPrice.toLocaleString('ko-KR')}원&nbsp;&nbsp;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
