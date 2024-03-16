import React, { useState } from 'react';
import './SignIn.scss';
import LogInBtn from '../../components/LogInBtn/LogInBtn';
import SignUpBtn from '../../components/SignUpBtn/SignUpBtn';
import KakaoBox from '../../components/KakaoLogin/KakaoLogin';
import GoogleBtn from '../../components/GoogleBtn/GoogleBtn';
import axiosInstance from '../../../api/instance';
import { useNavigate } from 'react-router-dom';
import { setTokens } from '../../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

function SignIn() {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = {
      email: emailValue,
      password: passwordValue,
    };
    const res = await axiosInstance.post('/users/login/', data);
    const { access, refresh } = res.data.tokens;
    dispatch(setTokens({ access, refresh }));
    navigate('/');
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
                <button className='signIn-signInBtn' onClick={handleLogin}>
                  <LogInBtn />
                </button>
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
