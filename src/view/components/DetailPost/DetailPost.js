import './DetailPost.scss'
import axios from 'axios'
import React, { useEffect } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { toggleLike } from '../../../redux/reducers/communitySlice'
import { postTagData } from '../../../data/PostCardData/PostTagData'
import axiosInstance from '../../../api/instance'

function DetailPost({user, location, image, title, content}) {
  const isLiked = useSelector((state) => state.community.like.isLiked);
  const dispatch = useDispatch();

  const formData = new FormData();
  const navigate = useNavigate();
  const id = window.location.href.split('/').reverse()[0]

  useEffect(() => {
    const storedLikeStatus = localStorage.getItem('post_like_status');
    if (storedLikeStatus !== null) {
      dispatch(toggleLike(JSON.parse(storedLikeStatus)));
    }
  }, [dispatch]);

  const handleLike = () => {
    axiosInstance.post(`/community/${id}/likes/`)
    .then(function (response) {
      dispatch(toggleLike(!isLiked));
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  };

  // 게시물 삭제
  const handleDeletePost = () => {
    axiosInstance.delete(`/community/${id}/`)
    .then(response => {
      console.log('Post deleted successfully:', response);
      navigate("/commuPostWeek");
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
  };

  return (
    <div className='DetailPost'>
      <header className='detailPost-header'>
        <div className='detailPost-profile'>
          <img
            className='detailPost-profileImg'
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          />
          <p className='detailPost-profileName'>{user} 님</p>
        </div>
        <div className='detailPost-headerRight'>
          <div className='detailPost-location'>
            <CiLocationOn className='detailPost-locaIcon' size='20' />
            <p className='detailPost-locaText'>{location}</p>
          </div>
          <button onClick={handleLike}>
            {isLiked ? (
              <IoIosHeartEmpty size='30' color='red' className='detailPost-like' />
            ) : (
              <IoIosHeart size='30' color='red' className='detailPost-like' />
            )}
          </button>
          <button className='detailPost-deleted' onClick={handleDeletePost}>
            X
          </button>
        </div>
      </header>
      <div className='detailPost-content'>
        <img className='detailPost-image' src={image} />
        <p className='detailPost-title'>{title}</p>
        <p className='detailPost-text'>{content}</p>
        <div className='detailPost-tags'>
          {postTagData.map((el) => {
            return (
              <div className='detailPost-tag'>
                <p className='detailPost-tagName'># {el.tagName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailPost;
