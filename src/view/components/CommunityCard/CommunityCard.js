import './CommunityCard.scss';
import { CiLocationOn } from 'react-icons/ci';

export default function CommunityCard() {
  return (
    <div className='communityCard'>
      <header className='communityCard-header'>
        <div className='communityCard-profile'>
          <img
            className='communityCard-profileImg'
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          />
          <p className='communityCard-profileName'>000님</p>
        </div>
        <div className='communityCard-location'>
          <CiLocationOn className='communityCard-locaIcon' size='20' />
          <p className='communityCard-locaText'>강남구</p>
        </div>
      </header>
      <div className='communityCard-content'>
        <img
          className='communityCard-image'
          src='https://images.unsplash.com/photo-1575932444877-5106bee2a599?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
        <p className='communityCard-text'>
          출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다 제기하다.
          45퍼센트 참여하다 쉽고 있은 있고 별다르면, 납부하며 돌파하다
        </p>
      </div>
      <footer className='communityCard-tags'>
        <div className='communityCard-tag'>#겨울 간식</div>
        <div className='communityCard-tag'>#붕어빵</div>
        <div className='communityCard-tag'>#간식</div>
      </footer>
    </div>
  );
}
