import React, { useEffect, useState } from 'react'
import './DetailPost.scss'
import { CiLocationOn } from 'react-icons/ci'
import { postTagData } from '../../../data/PostCardData/PostTagData'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { toggleLike } from '../../../redux/reducers/communitySlice'

function DetailPost({user, location, image, title, content}) {

    const data = [
        {
            img : "https://c.pxhere.com/photos/83/09/basil_blur_cuisine_delicious_dish_food_food_photography_grow-1545177.jpg!d",
            title: "강남역 근처 일식집이 오픈 했어요",
            text : "출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다. 제기하다. 45퍼센트 참여하다 쉽고 있은 있고 별다르면, 납부하며 돌파하다 출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다 제기하다. 45퍼센트 참여하다 쉽고 있은 있고 별다르면, 납부하며 돌파하다. 출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다. 45퍼센트 참여하다 쉽고 있은 있고 별다르면, 납부하며 돌파하다 출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다 제기하다"
        },
        {
            tag1 : "오픈소식",
            tag2 : "일식맛집",
            tag3 : "일식덮밥",
            tag4 : "동네맛집"
        }
    ] 
    
    // const [isLike, setIsLike] = useState(false);
    const isLiked = useSelector((state) => state.community.like.isLiked);
    const dispatch = useDispatch();
  
    // const handleLike = () => {
    //   setIsLike(!isLike);
    // };

    const formData = new FormData();
    const navigate = useNavigate();
    const id = window.location.href.split('/').reverse()[0]

  // 페이지 로드될 때 로컬 스토리지에서 좋아요 상태 가져오기
  useEffect(() => {
    const storedLikeStatus = localStorage.getItem('post_like_status');
    if (storedLikeStatus) {
      dispatch(toggleLike(JSON.parse(storedLikeStatus)));
    }
  }, [dispatch]);

  // // 좋아요 상태 변경 시 로컬 스토리지에 저장하기
  // useEffect(() => {
  //   localStorage.setItem('post_like_status', JSON.stringify(isLike));
  // }, [isLike]);

  const handleLike = () => {
    axios
      .post(
        `http://localhost:8000/community/${id}/likes/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      )
      .then(function (response) {
        dispatch(toggleLike(!isLiked)); // 좋아요 상태 토글
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };


    // 게시물 삭제
    const handleDeletePost = () => {
      axios
        .delete(`http://localhost:8000/community/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        })
        .then(response => {
          console.log('Post deleted successfully:', response);
          // 게시물 삭제 후 필요한 작업 수행 (예: 리다이렉트 등)
          navigate("/commuPostWeek")
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
              <IoIosHeart size='30' color='red' className='detailPost-like' />
            ) : (
              <IoIosHeartEmpty size='30' color='red' className='detailPost-like' />
            )}
          </button>
          <button className='detailPost-deleted' onClick={handleDeletePost}>
            X
          </button>
        </div>
      </header>
      <div className='detailPost-content'>
        <img
          className='detailPost-image'
          src={image}
        />
        <p className='detailPost-title'>{title}</p>
        <p className='detailPost-text'>{content}</p> 
        <div className='detailPost-tags'>
              {postTagData.map((el) => {
                return ( 
                    <div className='detailPost-tag'>
                        <p className='detailPost-tagName'># {el.tagName}</p>
                    </div>
                )
              })} 
        </div>
      </div>  
    </div>
  )
}

export default DetailPost
