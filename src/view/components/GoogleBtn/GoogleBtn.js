import React from 'react';
import './GoogleBtn.scss';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/authSlice';

function GoogleBtn() {
  const dispatch = useDispatch();
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const redirect_uri =
    'https://foodbridge.vercel.app/users/signin/googleCallback/';
  const scope = 'https://www.googleapis.com/auth/userinfo.email';
  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;

  const handleGoogleLogin = () => {
    dispatch(logout());
    window.location.href = link;
  };

  return (
    <div className='GoogleBtn' onClick={handleGoogleLogin}>
      <div className='googleBtn-frame'>
        <FcGoogle className='googleBtn-logo' />
        <h1 className='googleBtn-text'>구글 로그인</h1>
      </div>
    </div>
  );
}

export default GoogleBtn;
