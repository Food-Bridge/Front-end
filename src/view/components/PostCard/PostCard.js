import React, { useEffect, useState } from 'react'
import './PostCard.scss'
import { postTagData } from '../../../data/PostCardData/PostTagData';
import { CiFaceSmile, CiLocationOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

function PostCard({image, title, content}) {
  const navigate = useNavigate();
    
  const handlePostClick = () => {
    navigate('/postCard')
  }

  return (
    <div className='PostCard' onClick={handlePostClick}>
      <div className='postCard-frame'>
        <div className='postCard-header'>
          <div className='postCard-userInfo'>
            <CiFaceSmile className='postCard-userIcon'/>
            <div className='postCard-userName'>김선민 님</div>
          </div>
          <div className='postCard-location'>
            <CiLocationOn className='postCard-locaIcon'/> 
            <h1 className='postCard-locaName'>강남구</h1>
          </div>
        </div>
        <div className='postCard-section'>
          <div className='postCard-img'>
            <img className='postCard-imgSize' src={image} alt="img" />
          </div>
          <div className='postCard-contents'>
            <div className='postCard-postTitle'>{title}</div>
            {/* {postData.map(post => (<h2>{post.content}</h2>))} */}
            <div className='postCard-postWriting'>
              <p>{content}</p>
            </div>
            <div className='postCard-postTag'>
              {postTagData.map((el) => {
                return <h1 className='postCard-postTagName'># {el.tagName}</h1>
              })} 
              {/* {postData.map(post => (<h2>{post.content}</h2>))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
