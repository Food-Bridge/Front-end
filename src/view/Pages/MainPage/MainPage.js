import './MainPage.scss';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../../components/SearchBar/SearchBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import MenuBar from '../../components/MenuBar/MenuBar';
import CommunityCard from '../../components/CommunityCard/CommunityCard';
import PlusInfo from '../../components/PlusInfo/PlusInfo';
import { MiniPostData } from '../../../data/MiniPostData/MiniPostData';

export default function MainPage() {
  const SliderData = [
    {
      image:
        'https://images.unsplash.com/photo-1575932444877-5106bee2a599?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      image:
        'https://images.unsplash.com/photo-1627662168781-4345690f0bb3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      image:
        'https://images.unsplash.com/photo-1549759594-0d842f402b4d?q=80&w=949&auto= format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const navigate = useNavigate()

  const handleClickCoupon = () => {
    navigate('user/coupon/')
  }

  return (
    <div className='main'>
      <SearchBar className='main-searchBar' location='강남구' count='1' />
      <div className='main-imageSliderContainer'><ImageSlider className='main-imageSlider' slides={SliderData} /></div>
      
      <MenuBar name='menuBar-pageLine1'/>
      <div className='main-title'>
        <h1 className='main-text'>이달의 인기 맛집</h1>
        <PlusInfo text='더보기' arrow='true' />
      </div>

      <div className='main-group'>
        <img
          className='main-storeImg'
          src='https://images.unsplash.com/photo-1575932444877-5106bee2a599?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
        <img
          className='main-storeImg'
          src='https://images.unsplash.com/photo-1575932444877-5106bee2a599?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
        <img
          className='main-storeImg'
          src='https://images.unsplash.com/photo-1575932444877-5106bee2a599?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
      </div>
      <div className='main-title'>
        <h1 className='main-text'>인기 글</h1>
        <PlusInfo text='더보기' arrow='true' />
      </div>
      <div className='main-group'>
          {MiniPostData.map((el) => {
            return <CommunityCard user={el.user} location={el.location} img={el.img} text={el.text} className={el.className}/>
          })}
      </div>
      <div className='main-title'>
        <h1 className='main-text'>할인 쿠폰</h1>
        <PlusInfo text='더보기' arrow='true' onClick={handleClickCoupon}/>
      </div>
      <div className='main-group'>
        <img
          className='main-couponImg'
          src='https://images.unsplash.com/photo-1575932444877-5106bee2a599?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
        <img
          className='main-couponImg'
          src='https://images.unsplash.com/photo-1575932444877-5106bee2a599?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
      </div>
    </div>
  );
}
