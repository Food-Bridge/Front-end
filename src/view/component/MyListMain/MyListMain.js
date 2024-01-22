import './MyListMain.css';

import { TfiReceipt } from 'react-icons/tfi';
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { CiHeart } from 'react-icons/ci';

export default function MyListMain() {
  return (
    <div className='mylistMain'>
      <button className='mylistMain-box'>
        <div classNAme='mylistMain-content'>
          <TfiReceipt size='40' />
          <h2 className='mylistMain-title'>주문내역</h2>
        </div>
      </button>
      <button className='mylistMain-box'>
        <HiOutlineChatBubbleLeftEllipsis size='40' />
        <h2 className='mylistMain-title'>나의 리뷰</h2>
      </button>
      <button className='mylistMain-box mylistMain-last'>
        <CiHeart size='40' />
        <h2 className='mylistMain-title'>찜 목록</h2>
      </button>
    </div>
  );
}
