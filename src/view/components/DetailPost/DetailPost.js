import './DetailPost.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import axiosInstance from '../../../api/instance';
import { MdOutlineDelete } from 'react-icons/md';
import { CiHeart } from 'react-icons/ci';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegComment } from 'react-icons/fa';

import Swal from 'sweetalert2';

function DetailPost({ data }) {
  const navigate = useNavigate();
  const created = new Date(data.created_at);
  const formedCreated = created.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  // const [isLiked, setIsLiked] = useState(false);

  // if (data.like_users.includes()) {
  //   setIsLiked(true);
  // }

  const handleLike = () => {
    // const res = axiosInstance.post(`/community/${data.id}/likes/`);
    // console.log(res)
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
      .catch((error) => {
        Swal.fire({
          icon: 'warning',
          title: '알림',
          html: '게시물이 정상적으로 삭제되지 않았습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        });
      });
  };

  return (
    <div className='DetailPost'>
      <header className='detailPost-header'>
        <div className='detailPost-profile'>
          <img className='detailPost-profileImg' src={data.author_info.image} />
          <p className='detailPost-profileName'>
            {data.author_info.nickname || '닉네임'}
          </p>
        </div>
        <div className='detailPost-headerRight'>
          {/* <button onClick={handleLike}>
            {isLiked ? (
              <IoIosHeart size='24' color='red' className='detailPost-like' />
            ) : (
              <IoIosHeartEmpty
                size='24'
                color='red'
                className='detailPost-like'
              />
            )}
          </button> */}
          <button className='detailPost-deleted' onClick={handleDeletePost}>
            <MdOutlineDelete size='24' />
          </button>
        </div>
      </header>
      <div className='detailPost-content'>
        <h1 className='detailPost-title'>{data.title}</h1>
        {data._img.length > 0 && (
          <img className='detailPost-image' src={data._img[0].image} />
        )}

        <p className='detailPost-text'>{data.content}</p>
        <footer className='detailPost-footer'>
          <div className='detailPost-icons'>
            <CiHeart className='detailPost-icon' size='18'/>
            <p className='detailPost-numData'>{data.likes_count}</p>
            <IoEyeOutline className='detailPost-icon' size='18'/>
            <p className='detailPost-numData'>{data.views}</p>
            <FaRegComment className='detailPost-icon' />
            <p className='detailPost-numData'>{data.comment_count}</p>
          </div>
          <p className='detailPost-created'>{formedCreated}</p>
        </footer>
      </div>
    </div>
  );
}

export default DetailPost;
