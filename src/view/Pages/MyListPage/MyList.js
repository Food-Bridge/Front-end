import { useState } from 'react';

import MyListBlock from '../../component/MyListBlock/MyListBlock';
import MyListDeliver from '../../component/MyListDeliver/MyListDeliver';
import MyListMain from '../../component/MyListMain/MyListMain';
import PlusInfo from '../../component/PlusInfo/PlusInfo';
import './MyList.scss';

import { CiDiscount1, CiGift } from 'react-icons/ci';
import { IoSettingsOutline } from 'react-icons/io5';
import { GoMegaphone } from 'react-icons/go';
import { RiQuestionAnswerLine, RiCustomerService2Fill } from 'react-icons/ri';

export default function MyList() {
  const [image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

  const onChangeImage = (event) => {
    const { files } = event.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <div className='mylist'>
      <div className='mylistUser'>
        <div className='mylistUser-profile'>
          <img className='mylistUser-profileImg' src={image} />
          <input
            className='mylistUser-profileInput'
            id='file'
            type='file'
            accept='image/*'
            onChange={onChangeImage}
          />
          <label for='file' className='mylistUser-profileBtn'>
              편집
          </label>
        </div>
        <div className='mylistUser-group'>
          <div className='mylistUser-id'>
            <h1 className='mylistUser-id-name'>000님</h1>
            <p className='mylistUser-id-info'>test@gmail.com</p>
            <PlusInfo className='mylistUser-id-logout' text='로그아웃' />
          </div>
          <div className='mylistUser-detail'>
            <div className='mylistUser-detailBox'>
              <h2 className='mylistUser-detailBox-num'>123</h2>
              <p className='mylistUser-detailBox-title'>주문 내역</p>
            </div>{' '}
            <div className='mylistUser-detailBox'>
              <h2 className='mylistUser-detailBox-num'>34</h2>
              <p className='mylistUser-detailBox-title'>나의 리뷰</p>
            </div>
            <div className='mylistUser-detailBox'>
              <h2 className='mylistUser-detailBox-num'>54</h2>
              <p className='mylistUser-detailBox-title'>즐겨찾기</p>
            </div>
          </div>
        </div>
      </div>
      <MyListMain />
      <MyListDeliver />
      <div className='mylistBlocks-row'>
        <MyListBlock icon={<CiDiscount1 size='35' />} text='할인쿠폰' />
        <MyListBlock icon={<CiGift size='35' />} text='이벤트' />
        <MyListBlock icon={<IoSettingsOutline size='35' />} text='설정' />
      </div>
      <div className='mylistBlocks-row'>
        <MyListBlock icon={<GoMegaphone size='35' />} text='공지사항' />
        <MyListBlock
          icon={<RiQuestionAnswerLine size='35' />}
          text='자주 묻는 질문'
        />
        <MyListBlock
          icon={<RiCustomerService2Fill size='35' />}
          text='고객센터'
        />
      </div>
      <div className='mylistBanner' />
    </div>
  );
}