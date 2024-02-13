import React,{useEffect} from 'react'
import './GoogleBtn.scss'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GoogleBtn() {
  // const REST_API_KEY = '792829001349-mhe10a1cvuqpruve9m1vajl11mipbvu5.apps.googleusercontent.com';
  // const REDIRECT_URI = 'http://localhost:3000/users/signin/';
  // const google = `https://accounts.google.com/o/oauth2/v2/auth?client_id=792829001349-mhe10a1cvuqpruve9m1vajl11mipbvu5.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:3000/users/signin&scope=https://www.googleapis.com/auth/userinfo.email`

  // // const loginHandler = () => {
  // //   window.location.href = google;
  // // };

  //   /*
  // * 프론트에서 구글 로그인 
  // * 1. 등록한 구글 로그인 URL 성공시 code를 현재 페이지(signin)로 code 파라미터 받음
  // * 2. code로 구글에 인증 요청시 액세스 토큰 획득
  // * 3. 획득한 액세스 토큰으로 이메일 요청
  // * 4. 획득한 이메일로 회원가입
  // */
  //   const client_id     = process.env.GOOGLE_CLIENT_ID;
  //   const client_secret = process.env.GOOGLE_SECRET_ID;
  //   const GOOGLE_CALLBACK_URI = "localhost:3000/users/signin/";
  //   const google_code   = new URLSearchParams(window.location.search).get('code');
  
  //   if (google_code !== 'undefined') {
  //     const state = "rstring"; // 랜덤 문자열 사용
  //     axios.post("https://oauth2.googleapis.com/token", 
  //     {
  //       client_id: client_id,
  //       client_secret: client_secret,
  //       code: google_code,
  //       grant_type: "authorization_code",
  //       redirect_uri: GOOGLE_CALLBACK_URI,
  //       state: state
  //     },
  //     { "Content-Type": "application/json"},
  //     )
  //     .then(response => {
  //       /*
  //       * 성공시 access_token 획득
  //       * 획득한 액세스 토큰을 백엔드에 요청
  //       */ 
  //       const access_token = response.data.access_token;
  //       // response.get('access_token');
  //       // console.log(response.data);
  //       console.log(access_token)
  //     })
  //     .catch(error => {
  //       // Handle error
  //       console.error(error);
  //     });
  //   }

    //--------------------------------
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
      const params   = new URL(document.location.toString()).searchParams;
      const code = params.get('code');
      const client_id = process.env.GOOGLE_CLIENT_ID;
      const client_secret = process.env.GOOGLE_SECRET_ID;
      const GOOGLE_CALLBACK_URI = "http://127.0.0.1:3000/users/signin/googleCallback";
      const scope = "http://www.googleapis.com/auth/userinfo.email"
      const state = "rstring"
  
      window.location.href = `http://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code&redirect_uri=${GOOGLE_CALLBACK_URI}&state=${state}`;
      // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${GOOGLE_CALLBACK_URI}&response_type=${code}&client_secret=${client_secret}&scope=${scope}`;
    };

  return (
    <div className='GoogleBtn' onClick={handleGoogleLogin}>
      <div className='googleBtn-frame'>
        <FcGoogle className='googleBtn-logo'/>
        <h1 className='googleBtn-text'>구글 로그인</h1>        
      </div>
    </div>
  )
}


export default GoogleBtn
