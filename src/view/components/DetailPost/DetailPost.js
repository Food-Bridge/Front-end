import './DetailPost.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import axiosInstance from '../../../api/instance';
import { MdOutlineDelete } from 'react-icons/md';

import Swal from 'sweetalert2';

function DetailPost({ data }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  // if (data.like_users.includes()) {
  //   setIsLiked(true);
  // }

  const handleLike = () => {
    axiosInstance.post(`/community/${data.id}/likes/`);
  };

  const handleDeletePost = () => {
    axiosInstance
      .delete(`/community/${data.id}/`)
      .then(
        Swal.fire({
          icon: 'info',
          title: '게시물 삭제',
          html: '게시물을 정말로 삭제하시겠습니까?.',
          showCancelButton: true,
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
          confirmButtonColor: '#ca0000',
          cancelButtonColor: 'black',
        }).then((res) => {
          res.isConfirmed && navigate(-1);
        })
      )
      .catch(
        Swal.fire({
          icon: 'warning',
          title: '알림',
          html: '게시물이 정상적으로 삭제되지 않았습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        })
      );
  };

  return (
    <div className='DetailPost'>
      <header className='detailPost-header'>
        <div className='detailPost-profile'>
          <img
            className='detailPost-profileImg'
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          />
          <p className='detailPost-profileName'>
            {data.user_nickname || '닉네임'}
          </p>
        </div>
        <div className='detailPost-headerRight'>
          <button onClick={handleLike}>
            {isLiked ? (
              <IoIosHeart size='24' color='red' className='detailPost-like' />
            ) : (
              <IoIosHeartEmpty
                size='24'
                color='red'
                className='detailPost-like'
              />
            )}
          </button>
          <button className='detailPost-deleted' onClick={handleDeletePost}>
            <MdOutlineDelete size='24' />
          </button>
        </div>
      </header>
      <div className='detailPost-content'>
        <h1 className='detailPost-title'>{data.title}</h1>
        <img className='detailPost-image' src={data.image} />

        <p className='detailPost-text'>{data.content}</p>
      </div>
    </div>
  );
}

export default DetailPost;
