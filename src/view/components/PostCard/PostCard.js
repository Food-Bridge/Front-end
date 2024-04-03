import React from 'react';
import './PostCard.scss';
import { CiHeart } from 'react-icons/ci';
import { IoEyeOutline } from 'react-icons/io5';

function PostCard({ post }) {
  return (
    <div className='PostCard'>
      <div className='postCard-frame'>
        <header className='postCard-header'>
          <div className='postCard-userInfo'>
            <img className='postCard-userIcon' src={post.author_info.image} />
            <div className='postCard-userName'>
              {post.author_info.nickname ? post.author_info.nickname : '닉네임'}
            </div>
          </div>
          <div className='postCard-icons'>
            <div className='postCard-likeCount'>
              <h1 className='postCard-fontSize'>
                <CiHeart className='postCard-likeIcon' />
                {post.likes_count}
              </h1>
            </div>
            <div className='postCard-viewCount'>
              <h1 className='postCard-fontSize'>
                <IoEyeOutline className='postCard-viewIcon' />
                {post.views}
              </h1>
            </div>
          </div>
        </header>

        <div className='postCard-section'>
          {post.image && (
            <div className='postCard-img'>
              <img
                className='postCard-imgSize'
                src={post.image}
                alt='게시물 이미지'
              />
            </div>
          )}
          <div
            className={
              post.image ? 'postCard-contents' : 'postCard-contents noImage'
            }
          >
            <div className='postCard-postTitle'>{post.title}</div>
            <div
              className={
                post.image
                  ? 'postCard-postWriting'
                  : 'postCard-postWriting noImage'
              }
            >
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
