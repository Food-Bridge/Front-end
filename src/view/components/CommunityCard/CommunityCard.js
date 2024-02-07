import React from 'react';

import './CommunityCard.scss';
import { CiLocationOn } from 'react-icons/ci';

export default function CommunityCard({user, location, img, text, className}) {
  return (
    <div className={`${className}`}>
      <header className='communityCard-header'>
        <div className='communityCard-profile'>
          <img
            className='communityCard-profileImg'
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          />
          <p className='communityCard-profileName'>{user}</p>
        </div>
        <div className='communityCard-location'>
          <CiLocationOn className='communityCard-locaIcon' size='20' />
          <p className='communityCard-locaText'>{location}</p>
        </div>
      </header>
      <div className='communityCard-content'>
        <img
          className='communityCard-image'
          src={img}
        />
        <p className='communityCard-text'>{text}</p>
      </div>
      <footer className='communityCard-tags'>
        <div className='communityCard-tag'>#겨울 간식</div>
        <div className='communityCard-tag'>#붕어빵</div>
        <div className='communityCard-tag'>#간식</div>
      </footer>
    </div>
  );
}
