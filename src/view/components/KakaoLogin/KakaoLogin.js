import './KakaoLogin.scss';
import logo from '../../../data/KakaoLogo.png';

export default function KakaoBox() {
  return (
    <button className='kakaoLogin'>
      <div className='kakaoLogin-logo'>
        <img src={logo} alt='Kakao Login' />
      </div>
      <p className='kakaoLogin-title'>카카오 로그인</p>
    </button>
  );
}
