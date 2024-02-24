import React, { useState } from 'react';
import axios from 'axios';

const PostComment = ({ communityId }) => {
  const [newComment, setNewComment] = useState('');

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
    <div>
      <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
};

export default PostComment;