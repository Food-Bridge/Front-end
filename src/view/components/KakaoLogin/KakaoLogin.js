import './KakaoLogin.scss';
import logo from '../../../data/KakaoLogo.png';

export default function KakaoBox() {
  const REST_API_KEY = 'e1ea08564695a809c2ea4becbb1f5e1d';
  const REDIRECT_URI = 'http://127.0.0.1:3000/users/signin/callback/';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
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
