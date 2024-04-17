import React from 'react';
import './CommunityCard.scss';
import { CiHeart } from 'react-icons/ci';
import { IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function CommunityCard({ post }) {
  const navigate = useNavigate();
  const id = post.id;
  const handleClickCard = () => {
    navigate(`/postCard/${id}`);
  };

  if (!post) {
    return null;
  } else {
    return (
      <button className='CommunityCard' onClick={handleClickCard}>
        <header className='communityCard-header'>
          <div className='communityCard-profile'>
            <img
              className='communityCard-profileImg'
              src={post.author_info.image}
            />
            <p className='communityCard-profileName'>
              {post.author_info.nickname ? post.author_info.nickname : '닉네임'}
            </p>
          </div>
          <div className='communityCard-icons'>
            <div className='communityCard-likeCount'>
              <h1 className='communityCard-fontSize'>
                <CiHeart className='communityCard-likeIcon' />
                {post.likes_count}
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
          {post.img.length > 0 && (
            <img
              className='communityCard-image'
              src={post.img[0].image}
              alt='게시물 이미지'
            />
          )}
          <div
            className={
              post.img.length > 0
                ? 'communityCard-content'
                : 'communityCard-content noImage'
            }
          >
            <h1 className='communityCard-title'>{post.title}</h1>
            <p className='communityCard-text'>{post.content}</p>
          </div>
        </div>
      </button>
    );
  }
}
