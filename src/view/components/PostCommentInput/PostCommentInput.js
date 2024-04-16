import React, { useState } from 'react';
import './PostCommentInput.scss';
import { FiSend } from '@react-icons/all-files/fi/FiSend';
import axiosInstance from '../../../api/instance';
import Swal from 'sweetalert2';

function PostCommentInput({ id }) {
  const [content, setContent] = useState('');
  const onCommentChange = (event) => {
    setContent(event.target.value);
  };
  const handlePostComment = () => {
    axiosInstance
      .post(`/community/${id}/comment/create/`, {
        content,
        content,
      })
      .then(
        Swal.fire({
          icon: 'info',
          title: '댓글 등록',
          html: '댓글이 정상적으로 등록되었습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        }).then((res) => res.isConfirmed && window.location.reload())
      );
  };

  return (
    <>
      <div className='postDetail-commentInput'>
        <input
          onChange={onCommentChange}
          type='text'
          className='postDetail-InputBox'
          placeholder='댓글을 입력해주세요'
        />
        <button className='postDetail-sendIcon' onClick={handlePostComment}>
          <FiSend size='20' />
        </button>
      </div>
    </>
  );
}

export default PostCommentInput;
