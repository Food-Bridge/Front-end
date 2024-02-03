import React from 'react'
import './PostCard.scss'
import { postTagData } from '../../../data/PostCardData/PostTagData';
import { postImgData } from '../../../data/PostCardData/PostCardData';
import { CiFaceSmile, CiLocationOn } from "react-icons/ci";

function PostCard({postImg, postWriting, postTitle}) {

  return (
    <div className='PostCard'>
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
            <img className='postCard-imgSize' src={postImg} alt="img" />
          </div>
          <div className='postCard-contents'>
            <div className='postCard-postTitle'>{postTitle}</div>
            <div className='postCard-postWriting'>
              <p>{postWriting}</p>
            </div>
            <div className='postCard-postTag'>
              {postTagData.map((el) => {
                return <h1 className='postCard-postTagName'># {el.tagName}</h1>
              })} 
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PostCard
