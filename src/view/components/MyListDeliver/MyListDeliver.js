import React, { useEffect } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { CiClock2 } from 'react-icons/ci';
import { HiOutlineXMark } from 'react-icons/hi2';
import './MyListDeliver.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDeliverInfo,
  setDeliverState,
  setShowMyListDeliver,
} from '../../../redux/reducers/deliverSlice';

export default function MyListDeliver() {
  const dispatch = useDispatch();
  const data = useSelector(selectDeliverInfo);
  const created = new Date(data.created);
  const currentTime = new Date();
  const totalTime = data.prepareTime + data.deliverTime;
  const restTime = Math.round(
    totalTime - (currentTime - created) / (1000 * 60)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (restTime >= data.prepareTime && data.deliverState === 0) {
        dispatch(setDeliverState(1));
      }
      if (restTime <= 0 && data.deliverState === 1) {
        dispatch(setDeliverState(2));
      }
      if (data.deliverState === 2 && restTime <= -5) {
        dispatch(setShowMyListDeliver(false));
      }
    }, 60000);
    return () => clearTimeout(timer);
  }, [restTime, data.prepareTime, data.deliverState, dispatch]);

  return (
    <div className='mylistDeliver'>
      <div className='mylistDeliver-header'>
        <button className='mylistDeliver-cancel'>
          <HiOutlineXMark size='30' />
        </button>
        <h2 className='mylistDeliver-title-text'>
          {data.restaurantName} 배달 현황
        </h2>
      </div>
      <div className='mylistDeliver-content'>
        <div className='mylistDeliver-status'>
          <div className='mylistDeliver-status-group'>
            <div className='mylistDeliver-status-stage'>
              <h3 className='mylistDeliver-status-title'>주문 접수</h3>
              <CiLocationOn size='24' />
            </div>
            <div className='mylistDeliver-status-stage'>
              <h3 className='mylistDeliver-status-title'>배달 시작</h3>
              <CiLocationOn size='24' />
            </div>
            <div className='mylistDeliver-status-stage'>
              <h3 className='mylistDeliver-status-title'>도착 완료</h3>
              <CiLocationOn size='24' />
            </div>
          </div>
          <progress
            className='mylistDeliver-progress'
            value={data.deliverState}
            max='2'
          ></progress>
        </div>
        <div className='mylistDeliver-time'>
          <h3 className='mylistDeliver-time-title'>남은 시간</h3>
          <div className='mylistDeliver-time-group'>
            <CiClock2 size='24' />
            <p className='mylistDeliver-time-minute'>
              {restTime >= 0 ? restTime : 0}분
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
