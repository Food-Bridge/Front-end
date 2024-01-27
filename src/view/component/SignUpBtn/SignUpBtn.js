import React from 'react'
import './SignUpBtn.scss'

function SignUpBtn({className1, className2}) {
  return (
    <div className='SignUpBtn'>
      <div className={`${className1}`}>
        <button className={`${className2}`}>회원가입</button>
      </div>
    </div>
  )
}

export default SignUpBtn
