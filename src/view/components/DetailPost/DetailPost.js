import './DetailPost.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import axiosInstance from '../../../api/instance';
import { MdOutlineDelete } from 'react-icons/md';
import { CiHeart } from 'react-icons/ci';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegComment } from 'react-icons/fa';
import { TbEdit } from "react-icons/tb";

import Swal from 'sweetalert2';
import { useGetId } from '../../../api/useGetId';

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

  const currentUser = useGetId();

  const userLike = data.like_users.some(user => user.id === currentUser)
  const [isLiked, setIsLiked] = useState(userLike);
  const [likesCount, setLikesCount] = useState(data.likes_count);
  const [updateContent, setUpdateContent] = useState(data.content);
  const [editBtn, setEditBtn] = useState(false);

  const handleLike = async () => {
    try {
      await axiosInstance.post(`/community/${data.id}/likes/`);
      setIsLiked(!isLiked);
      const response = await axiosInstance.get(`/community/${data.id}`);
      setLikesCount(response.data.likes_count)
    } catch (error) {
      console.error('Error liking post:', error);
      setIsLiked(!isLiked);
    }
  };

  const isUserPost = currentUser === data.author_info.user
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

  const onEdit = () => {
    setEditBtn(!editBtn);
    setUpdateContent(data.content);
  }

  const onChange = (e) => {
    setUpdateContent(e.target.value);
  }

  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/community/${data.id}/`,
        { content: updateContent },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      setEditBtn(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'warning',
        title: '알림',
        html: '게시글을 확인해주세요',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      });
    }
  }

  return (
    <div className='DetailPost'>
      <header className='detailPost-header'>
        <div className='detailPost-profile'>
          <img className='detailPost-profileImg' src={data.author_info.image} alt='프로필 이미지' />
          <p className='detailPost-profileName'>
            {data.author_info.nickname || '닉네임'}
          </p>
        </div>
        <div className='detailPost-headerRight'>
          {editBtn ? <>
            <button onClick={handleEditPost} className='postSubmit-button'>저장</button>
            <button onClick={onEdit} className='postSubmit-button'>취소</button>
          </>
            : <>
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

              {isUserPost && (<>
                <button className='detailPost-deleted' onClick={onEdit}>
                  <TbEdit size='24' />
                </button >
                <button className='detailPost-deleted' onClick={handleDeletePost}>
                  <MdOutlineDelete size='24' />
                </button></>
              )}</>
          }
        </div>
      </header>
      <div className='detailPost-content'>
        <h1 className='detailPost-title'>{data.title}</h1>
        {editBtn ?
          <textarea
            className='editInput'
            onChange={onChange}
            value={updateContent} />
          : <>
            {data._img.length > 0 && (
              <img className='detailPost-image' src={data._img[0].image} alt='게시글 이미지' />
            )}

            <p className='detailPost-text'>{data.content}</p>
            <footer className='detailPost-footer'>
              <div className='detailPost-icons'>
                <CiHeart className='detailPost-icon' size='18' />
                <p className='detailPost-numData'>{likesCount}</p>
                <IoEyeOutline className='detailPost-icon' size='18' />
                <p className='detailPost-numData'>{data.views}</p>
                <FaRegComment className='detailPost-icon' />
                <p className='detailPost-numData'>{data.comment_count}</p>
              </div>
              <p className='detailPost-created'>{formedCreated}</p>
            </footer>
          </>
        }
      </div>
    </div>
  );
}

export default DetailPost;
