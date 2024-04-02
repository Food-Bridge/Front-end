import React, { useEffect, useState } from 'react'
import './PostCard.scss'
import { postTagData } from '../../../data/PostCardData/PostTagData';
import { CiFaceSmile, CiHeart, CiLocationOn} from "react-icons/ci";
import { IoEyeOutline } from 'react-icons/io5';

function PostCard({image, title, content, user, likeCount, views}) {

  return (
    <div className='PostCard'>
      <div className='postCard-frame'>
        <div className='postCard-header'>
          <div className='postCard-userInfo'>
            <CiFaceSmile className='postCard-userIcon'/>
            <div className='postCard-userName'>{user} 님</div>
            <div className='postCard-likeCount'>
              <h1 className='postCard-fontSize'>
                <CiHeart className='postCard-likeIcon'/>
                {likeCount}
              </h1>
            </div>
            <div className='postCard-viewCount'>
            <h1 className='postCard-fontSize'>
              <IoEyeOutline  className='postCard-viewIcon'/>
              {views}
            </h1>
            </div>
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
