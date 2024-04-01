import React, { useState } from 'react';
import './DetailPost.scss';
import { CiLocationOn } from 'react-icons/ci';
import { postTagData } from '../../../data/PostCardData/PostTagData';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

function DetailPost({ user, location, image, title, content }) {
  const data = [
    {
      img: 'https://c.pxhere.com/photos/83/09/basil_blur_cuisine_delicious_dish_food_food_photography_grow-1545177.jpg!d',
      title: '강남역 근처 일식집이 오픈 했어요',
      text: '출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다. 제기하다. 45퍼센트 참여하다 쉽고 있은 있고 별다르면, 납부하며 돌파하다 출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다 제기하다. 45퍼센트 참여하다 쉽고 있은 있고 별다르면, 납부하며 돌파하다. 출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다. 45퍼센트 참여하다 쉽고 있은 있고 별다르면, 납부하며 돌파하다 출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다 제기하다',
    },
    {
      tag1: '오픈소식',
      tag2: '일식맛집',
      tag3: '일식덮밥',
      tag4: '동네맛집',
    },
  ];

  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    setIsLike(!isLike);
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
            {isLike ? (
              <IoIosHeart size='30' color='red' className='detailPost-like' />
            ) : (
              <IoIosHeartEmpty
                size='30'
                color='red'
                className='detailPost-like'
              />
            )}
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
