import React from 'react';
import './CommunityCard.scss';
import { IoIosHeartEmpty } from '@react-icons/all-files/io/IoIosHeartEmpty'
import { useNavigate } from 'react-router-dom';

export default function CommunityCard({ post }) {
  const navigate = useNavigate();
  const id = post.id;
  const imageCheck = post._img && post._img.length > 0;
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
              rel="preload"
              className='communityCard-profileImg'
              src={post.author_info.image} alt='프로필 이미지'
            />
            <p className='communityCard-profileName'>
              {post.author_info.nickname ? post.author_info.nickname : '닉네임'}
            </p>
          </div>
          <div className='communityCard-icons'>
            <div className='communityCard-likeCount'>
              <h1 className='communityCard-fontSize'>
                <IoIosHeartEmpty className='communityCard-likeIcon' />
                {post.likes_count}
              </h1>
            </div>
          </div>
        </header>
        <div className='communityCard-box'>
          {imageCheck && (
            <img
              rel="preload"
              className='communityCard-image'
              src={post._img[0].image}
              alt='게시물 이미지'
            />
          )}
          <div
            className={
              imageCheck
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
