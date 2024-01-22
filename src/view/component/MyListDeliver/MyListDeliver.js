import { CiLocationOn } from 'react-icons/ci';
import { CiClock2 } from 'react-icons/ci';
import { HiOutlineXMark } from 'react-icons/hi2';

import './MyListDeliver.css';

export default function MyListDeliver() {
  return (
    <div className='mylistDeliver'>
      <div className='mylistDeliver-header'>
        <button className='mylistDeliver-cancel'>
          <HiOutlineXMark size='30' />
        </button>
        <h2 className='mylistDeliver-title-text'>배달 현황</h2>
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
          <progress className='mylistDeliver-progress' value='1' max='2' />
        </div>
        <div className='mylistDeliver-time'>
          <h3 className='mylistDeliver-time-title'>남은 시간</h3>
          <div className='mylistDeliver-time-group'>
            <CiClock2 size='24' />
            <p className='mylistDeliver-time-minute'>30분</p>
          </div>
        </div>
      </div>
    </div>
  );
}
