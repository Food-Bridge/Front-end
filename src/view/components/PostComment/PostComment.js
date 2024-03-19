import React, { useEffect, useState } from 'react';
import './PostComment.scss'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'

const PostComment = ({content, user}) => {
  const [isLike, setIsLike] = useState(false);
  
  const handleLike = () => {
    setIsLike(!isLike);
  };
  
  return (
    <div className='PostComment'>
      <div className='postComment-frame'>
        <div className='postComment-top'>
          <div className='postComment-userInfo'>
            <div className='postComment-profile'></div>
            <div className='postComment-userName'> {user} 님</div>
          </div>
          <button className='postComment-like' onClick={handleLike}>
            {isLike ? (
              <IoIosHeart size='24' color='red' className='postComment-likeIcon' />
            ) : (
              <IoIosHeartEmpty size='24' color='red' className='postComment-likeIcon' />
            )}
          </button>
        </div>
        <div className='postComment-commentFrame'>
          <h1 className='postComment-comment'>
            {content}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PostComment;