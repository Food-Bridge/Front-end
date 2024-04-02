import React from 'react';
import './CommunityCard.scss';

export default function CommunityCard({ post }) {
  return (
    <div className='CommunityCard'>
      <header className='communityCard-header'>
        <div className='communityCard-profile'>
          <img
            className='communityCard-profileImg'
            src={
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
          />
          <p className='communityCard-profileName'>닉네임</p>
        </div>
      </header>
      <div className='communityCard-box'>
        <img className='communityCard-image' src={post.image} alt='img' />
        <div className='communityCard-content'>
          <h1 className='communityCard-title'>{post.title}</h1>
          <p className='communityCard-text'>{post.content}</p>
        </div>
      </div>
    </div>
  );
}
