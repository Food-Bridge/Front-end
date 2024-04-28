import React from 'react';
import { MdLocationOn } from '@react-icons/all-files/md/MdLocationOn';
import { FaRegClock } from '@react-icons/all-files/fa/FaRegClock';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import './MyListDeliver.scss';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteDeliverList } from '../../../redux/reducers/deliverSlice';

export default function MyListDeliver({ data }) {
  const dispatch = useDispatch();
  const created = new Date(data.created);
  const currentTime = new Date();
  const restTime = Math.round(
    data.totalTime - (currentTime - created) / (1000 * 60)
  );
  let deliverState;
  if (restTime <= 0) {
    deliverState = 2;
    if (restTime <= -10) {
      dispatch(deleteDeliverList(data.id));
    }
  } else if (restTime < data.deliverTime) {
    deliverState = 1;
  } else {
    deliverState = 0;
  }

  const handleDeleteData = () => {
    Swal.fire({
      icon: 'warning',
      title: '배달 현황 삭제',
      html: '배달 현황을 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      confirmButtonColor: '#ca0000',
      cancelButtonColor: 'black',
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(deleteDeliverList(data.id));
      }
    });
  };

  return (
    <div className='mylistDeliver'>
      <div className='mylistDeliver-header'>
        <button className='mylistDeliver-cancel' onClick={handleDeleteData}>
          <IoMdClose size='30' />
        </button>
        <h2 className='mylistDeliver-title-text'>
          {data.restaurantName} 배달 현황
        </h2>
      </div>
      <div className='mylistDeliver-content'>
        <div className='mylistDeliver-status'>
          <div className='mylistDeliver-status-group'>
            <div
              className={`mylistDeliver-status-stage ${
                data.deliverState === 0 ? 'active' : ''
              }`}
            >
              <h3 className='mylistDeliver-status-title'>주문 접수</h3>
              <MdLocationOn size='24' />
            </div>
            <div
              className={`mylistDeliver-status-stage ${
                data.deliverState === 1 ? 'active' : ''
              }`}
            >
              <h3 className='mylistDeliver-status-title'>배달 시작</h3>
              <MdLocationOn size='24' />
            </div>
            <div
              className={`mylistDeliver-status-stage ${
                data.deliverState === 2 ? 'active' : ''
              }`}
            >
              <h3 className='mylistDeliver-status-title'>도착 완료</h3>
              <MdLocationOn size='24' />
            </div>
          </div>
          <progress
            className='mylistDeliver-progress'
            value={deliverState}
            max='2'
          ></progress>
        </div>
        <div className='mylistDeliver-time'>
          <h3 className='mylistDeliver-time-title'>남은 시간</h3>
          <div className='mylistDeliver-time-group'>
            {restTime > 0 && <FaRegClock size='24' />}
            <p className='mylistDeliver-time-minute'>
              {restTime > 0 ? `${restTime}분` : '도착완료'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
