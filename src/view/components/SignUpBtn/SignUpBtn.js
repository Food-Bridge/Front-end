import React from 'react'
import './SignUpBtn.scss'

function SignUpBtn({className1, className2}) {
  return (
    <div className='SignUpBtn'>
      <div className={`${className1}`}>
        <div className={`${className2}`}>회원가입</div>
      </div>
    </div>
  )
}

export default SignUpBtn
