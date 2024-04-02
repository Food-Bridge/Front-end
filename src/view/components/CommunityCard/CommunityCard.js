import React from 'react';
import './CommunityCard.scss';
import { CiHeart } from 'react-icons/ci';
import { IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function CommunityCard({ post }) {
  const navigate = useNavigate()
  const id = post.id
  const handleClickCard = () => {
    navigate(`/postCard/${id}`)
  }
  return (
    <button className='CommunityCard' onClick={handleClickCard}>
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
        <div className='communityCard-icons'>
          <div className='communityCard-likeCount'>
            <h1 className='communityCard-fontSize'>
              <CiHeart className='communityCard-likeIcon' />
              {post.like_users.length}
            </h1>
          </div>
          <div className='communityCard-viewCount'>
            <h1 className='communityCard-fontSize'>
              <IoEyeOutline className='communityCard-viewIcon' />
              {post.views}
            </h1>
          </div>
        </div>
      </header>
      <div className='communityCard-box'>
        <img className='communityCard-image' src={post.image} alt='img' />
        <div
          className={
            post.image
              ? 'communityCard-content'
              : 'communityCard-content noImage'
          }
        >
          <h1 className='communityCard-title'>{post.title}</h1>
          <p
            className={
              post.image ? 'communityCard-text' : 'communityCard-text noImage'
            }
          >
            {post.content}
          </p>
        </div>
      </div>
    </button>
  );
}
