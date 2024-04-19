import './DetailPost.scss';
import React, { useState } from 'react';
import axiosInstance from '../../../api/instance';
import { useNavigate } from 'react-router-dom';
import { IoIosHeart } from '@react-icons/all-files/io/IoIosHeart';
import { IoIosHeartEmpty } from '@react-icons/all-files/io/IoIosHeartEmpty';
import { AiOutlineDelete } from '@react-icons/all-files/ai/AiOutlineDelete';
import { FaRegComment } from '@react-icons/all-files/fa/FaRegComment';
import { GoPencil } from '@react-icons/all-files/go/GoPencil';
import Swal from 'sweetalert2';
import { useGetId } from '../../../api/useGetId';
import { FaImage } from '@react-icons/all-files/fa/FaImage';
import ImageUploader from '../../../api/compress';

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
  const userLike = data.like_users.some((user) => user.id === currentUser);
  const [isLiked, setIsLiked] = useState(userLike);
  const [likesCount, setLikesCount] = useState(data.likes_count);
  const [editBtn, setEditBtn] = useState(false);
  const [updateContent, setUpdateContent] = useState(data.content);
  const [updateTitle, setUpdateTitle] = useState(data.title);
  const imageCheck = data._img.length > 0
  const [updateImage, setUpdateImage] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(imageCheck ? data._img[0].image : null);
  const [basicImg, setBasicImg] = useState(imageCheck ? data._img[0].image : null);


  const handleLike = async () => {
    try {
      await axiosInstance.post(`/community/${data.id}/likes/`);
      setIsLiked(!isLiked);
      const response = await axiosInstance.get(`/community/${data.id}`);
      setLikesCount(response.data.likes_count);
    } catch (error) {
      console.error('Error liking post:', error);
      setIsLiked(!isLiked);
    }
  };

  const isUserPost = currentUser === data.author_info.user;
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
    setImageDisplay(basicImg);
    setUpdateTitle(data.title);
    setUpdateContent(data.content);
  }

  const onContentChange = (e) => {
    setUpdateContent(e.target.value);
  }

  const onTitleChange = (e) => {
    setUpdateTitle(e.target.value);
  }

  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', updateTitle);
      formData.append('content', updateContent);
      if (updateImage !== null) {
        formData.append('img', updateImage);
      }
      await axiosInstance.patch(`/community/${data.id}/`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      setEditBtn(!editBtn)
      if (updateImage !== null) {
        setBasicImg(imageDisplay);
        setUpdateImage(null);
      }
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
          <img rel="preload" className='detailPost-profileImg' src={data.author_info.image} alt='프로필 이미지' />
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
                  <GoPencil size='24' />
                </button >
                <button className='detailPost-deleted' onClick={handleDeletePost}>
                  <AiOutlineDelete size='24' />
                </button></>
              )}</>
          }
        </div>
      </header>
      <div className='detailPost-content'>
        {editBtn ? <>
          <input className='editTitle' onChange={onTitleChange} value={updateTitle} />
          <textarea
            className='editContent'
            onChange={onContentChange}
            value={updateContent} />
          <label htmlFor="file">
            <FaImage className='postUpload-photoIcon' size={20} />
          </label>
          <div style={{ display: 'none' }}>
            <ImageUploader
              size='1.5'
              setImage={setUpdateImage}
              setImageDisplay={setImageDisplay}
              length='1000'
            />
          </div>
          {imageDisplay && (
            <img rel="preload" className='detailPost-image' src={imageDisplay} alt='DisplayImage' />
          )}
        </> : <>
          <h1 className='detailPost-title'>{updateTitle}</h1>
          {imageDisplay && (
            <img rel="preload" className='detailPost-image' src={basicImg} alt='DisplayImage' />
          )}

          <p className='detailPost-text'>{updateContent}</p>
          <footer className='detailPost-footer'>
            <div className='detailPost-icons'>
              <IoIosHeart className='detailPost-icon' size='18' />
              <p className='detailPost-numData'>{likesCount}</p>
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
