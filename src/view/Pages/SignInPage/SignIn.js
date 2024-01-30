import React, { useState } from 'react';
import './SignIn.scss';
import LogInBtn from '../../components/LogInBtn/LogInBtn';
import LogoBar from '../../components/LogoBar/LogoBar';
import SignUpBtn from '../../components/SignUpBtn/SignUpBtn';
import KakaoBox from '../../components/KakaoLogin/KakaoLogin';
import GoogleBtn from '../../components/GoogleBtn/GoogleBtn';

import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function SignIn() {
  const [emailVaule, setEmail] = useState('');
  const [passwordVaule, setPassword] = useState('');

  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  const handleLogin = () => {
    setSignedIn(true);

    navigate('/signup');
  };

  const saveUserEmail = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  }
  const saveUserPassword = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  }

  return (
    <>
      <LogoBar />
      <div className='SignIn'>
        <header className='signIn-frame'>
          <h1 className='signIn-title'>로그인</h1>
          <div className='signIn-flex'>
            <div className='signIn-margin'>
              <div className='signIn-formMargin'>
                <div className='signIn-emailForm'>
                  <input 
                    type="text" 
                    placeholder='아이디 또는 이메일' 
                    className='signIn-emailInput'
                    value={emailVaule} 
                    onChange={saveUserEmail}
                  />
                </div>
                <div className='signIn-passwdForm'>
                  <input 
                    type="text" 
                    placeholder='비밀번호' 
                    className='signIn-passwdInput'
                    value={passwordVaule} 
                    onChange={saveUserPassword}
                  />
                </div>
              </div>
              <div className='signIn-btnMargin'>
                <div className='signIn-signInBtn'
                  onClick={() => {
                    axios.post("http://localhost:8000/users/login/", {
                        email : emailVaule,
                        password : passwordVaule
                    }).then(function (response) {
                      console.log(response);
                      handleLogin();
                    }).catch(function (error) {
                      console.log(error);
                    })
                  }}                
                >
                  <LogInBtn />
                </div>
                <div className='signIn-signUpBtn'>
                  <SignUpBtn
                    className1={'signUpBtn-frame2'}
                    className2={'signUpBtn-text2'}
                  />
                </div>
                <h1 className='signIn-findText'>아이디/비밀번호 찾기</h1>
              </div>
            </div>
            <div className='signIn-btn'>
              <div className='signIn-line'></div>
              <KakaoBox className='signInBtn-kakaoBtn' />
              <GoogleBtn className='signInBtn-google' />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default SignIn;