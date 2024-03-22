import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostComment.scss'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const PostComment = ({content, user, commentId}) => {
  const [isLike, setIsLike] = useState(false);
  
  const handleLike = () => {
    setIsLike(!isLike);
  };

  const id = window.location.href.split('/').reverse()[0]
  // const commentId = window.location.href.split('/').reverse()[0]
  const navigate = useNavigate();

  // 댓글 삭제
  const handleDeletePost = () => {
    axios
    .delete(`http://localhost:8000/community/${id}/comment/${commentId}/delete/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then(response => {
        console.log('Post deleted successfully:', response);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className='PostComment'>
      <div className='postComment-frame'>
        <div className='postComment-top'>
          <div className='postComment-userInfo'>
            <div className='postComment-profile'></div>
            <div className='postComment-userName'> {user} 님</div>
          </div>
          <div className='postComment-headerRight'>
            <button className='postComment-like' onClick={handleLike}>
              {isLike ? (
                <IoIosHeart size='24' color='red' className='postComment-likeIcon' />
              ) : (
                <IoIosHeartEmpty size='24' color='red' className='postComment-likeIcon' />
              )}
            </button>
            <button className='postComment-deleted' onClick={handleDeletePost}>
              X
            </button>
          </div>
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