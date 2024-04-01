import React from 'react';
import './KakaoLogin.scss';
import logo from '../../../data/KakaoLogo.png';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/authSlice';

export default function KakaoBox() {
  const dispatch = useDispatch()
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = 'http://127.0.0.1:3000/users/signin/callback/';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    dispatch(logout())
    window.location.href = link;
  };

  return (
    <button className='kakaoLogin' onClick={loginHandler}>
      <div className='kakaoLogin-logo'>
        <img src={logo} alt='Kakao Login' />
      </div>
      <p className='kakaoLogin-title'>카카오 로그인</p>
    </button>
  );
}
