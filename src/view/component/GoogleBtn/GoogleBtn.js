import React from 'react'
import './GoogleBtn.scss'
import { FcGoogle } from "react-icons/fc";

function GoogleBtn() {
  return (
    <div className='GoogleBtn'>
      <div className='googleBtn-frame'>
        <FcGoogle className='googleBtn-logo'/>
        <h1 className='googleBtn-text'>구글 로그인</h1>        
      </div>
    </div>
  )
}


export default GoogleBtn
