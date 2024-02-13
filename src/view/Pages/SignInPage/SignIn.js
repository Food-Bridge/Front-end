import React, { useState } from 'react';
import './SignIn.scss';
import LogInBtn from '../../components/LogInBtn/LogInBtn';
import SignUpBtn from '../../components/SignUpBtn/SignUpBtn';
import KakaoBox from '../../components/KakaoLogin/KakaoLogin';
import GoogleBtn from '../../components/GoogleBtn/GoogleBtn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login, selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import { useSelector, useDispatch} from 'react-redux'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'; 

function SignIn() {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/login/', {
        email: emailValue,
        password: passwordValue, 
        headers: { "Content-Type" : "application/json" },
      });
      const user = response.data;
      console.log('Login Success:', user.tokens);
      
      localStorage.setItem('access', user.tokens.access);
      localStorage.setItem('refresh', user.tokens.refresh);
      dispatch(login())
      console.log(isLoggedIn)
      navigate('/');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleSignUp = () => {
    navigate('/users/signup/');
  };

  const saveUserEmail = (event) => {
    setEmail(event.target.value);
  };

  const saveUserPassword = (event) => {
    setPassword(event.target.value);
  };

  // // 구글 로그인
  // const googleClientId = process.env.REACT_APP_GOGGLE_KEY;

  // const googleRedirectUrl = process.env.REACT_APP_GOOGLE_REDIRECT_URL;

  // const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=792829001349-mhe10a1cvuqpruve9m1vajl11mipbvu5.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:3000/users/signin&scope=https://www.googleapis.com/auth/userinfo.email`;

  // const loginHandler = () => {
  //   window.location.href = googleAuthUrl;
  //   console.log('Login Success:', googleAuthUrl.access_token);
  // }
 
  // const handleGoogleLogin = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8000/users/login/', {
  //       email: emailValue,
  //       password: passwordValue, 
  //       headers: { "Content-Type" : "application/json" },
  //     });
  //     const user = response.data;
  //     console.log('Login Success:', user.tokens);
      
  //     localStorage.setItem('access', user.tokens.access);
  //     localStorage.setItem('refresh', user.tokens.refresh);
  //     dispatch(login())
  //     console.log(isLoggedIn)
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Login Error:', error);
  //   }
  // };

  return (
    <>
      <div className='SignIn'>
        <header className='signIn-frame'>
          <h1 className='signIn-title'>로그인</h1>
          <div className='signIn-flex'>
            <div className='signIn-margin'>
              <div className='signIn-formMargin'>
                <div className='signIn-emailForm'>
                  <input
                    type='text'
                    placeholder='아이디 또는 이메일'
                    className='signIn-emailInput'
                    value={emailValue}
                    onChange={saveUserEmail}
                  />
                </div>
                <div className='signIn-passwdForm'>
                  <input
                    type='password'
                    placeholder='비밀번호'
                    className='signIn-passwdInput'
                    value={passwordValue}
                    onChange={saveUserPassword}
                  />
                </div>
              </div>
              <div className='signIn-btnMargin'>
                <div className='signIn-signInBtn' onClick={handleLogin}>
                  <LogInBtn />
                </div>
                <div className='signIn-signUpBtn' onClick={handleSignUp}>
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