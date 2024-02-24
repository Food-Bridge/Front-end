import React, { useState } from 'react';
import axios from 'axios';
import './PostComment.scss'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'

const PostComment = ({userName, comment}) => {
  const [newComment, setNewComment] = useState('');
  const [isLike, setIsLike] = useState(false);
  
  const handleLike = () => {
    setIsLike(!isLike);
  };

  const handleCommentSubmit = () => {
    // 댓글 생성 API에 POST 요청 보내기
    axios.post(
      `http://127.0.0.1:8000/community/create/`,
      { text: newComment },
      {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'X-CSRFToken': '4DHYe8xOYHKOdYVbl8qvPaYi92YBktGmCtO1AudMPA5ZQTogGP2t0Hfrfa0zNnCo',
        },
      }
    )
    .then(response => {
      console.log('Comment created successfully:', response.data);
      // 생성한 댓글에 대한 추가적인 처리나 업데이트를 수행할 수 있음
    })
    .catch(error => {
      console.error('Error creating comment:', error);
    });
  };

  return (
    <div className='PostComment'>
      {/* <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={handleCommentSubmit}>Submit Comment</button> */}

      <div className='postComment-frame'>
        <div className='postComment-top'>
          <div className='postComment-userInfo'>
            <div className='postComment-profile'></div>
            <div className='postComment-userName'>{userName} 님</div>
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
            {comment}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PostComment;