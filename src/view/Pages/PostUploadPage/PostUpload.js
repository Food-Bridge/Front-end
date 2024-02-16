import React, { useState } from 'react'
import './PostUpload.scss'
import { CiImageOn, CiLocationOn } from "react-icons/ci";

function PostUpload() {

  return (
    <div className='PostUpload'>
        <div className='postUpload-header'>
          <p className='postUpload-headerTitle'>글쓰기</p>
        </div>
        <div className='postUpload-title'>
          <input className='postUpload-inputTitle' type="text" placeholder='제목을 입력하세요' />
        </div>
        <div className='postUpload-inputMain'>
          <textarea className='postUpload-inputForm' type="text" placeholder='추천하고 싶은 맛집이나 새로 오픈한 가게 정보 등을 커뮤니티를 통해 공유해주세요!' />
          <div className='postUpload-etcIcons'>
            <div className='postUpload-photo'>
              <CiImageOn className='postUpload-photoIcon' />
            </div>
            <div className='postUpload-location'>
              <CiLocationOn className='postUpload-locationIcon' />
            </div>
          </div>
        </div>
        <div className='postUpload-button'>
          <button className='postUpload-uploadButton'>게시글 업로드</button>
        </div>
    </div>
  )
}

export default PostUpload
