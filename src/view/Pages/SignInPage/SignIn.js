import React from 'react';
import './SignIn.scss';
import LogInBtn from '../../components/LogInBtn/LogInBtn';
import LogoBar from '../../components/LogoBar/LogoBar';
import SignUpBtn from '../../components/SignUpBtn/SignUpBtn';
import KakaoBox from '../../components/KakaoLogin/KakaoLogin';
import GoogleBtn from '../../components/GoogleBtn/GoogleBtn';

function SignIn() {
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
                    type='text'
                    placeholder='아이디 또는 이메일'
                    className='signIn-emailInput'
                  />
                </div>
                <div className='signIn-passwdForm'>
                  <input
                    type='text'
                    placeholder='비밀번호'
                    className='signIn-passwdInput'
                  />
                </div>
              </div>
              <div className='signIn-btnMargin'>
                <div className='signIn-signInBtn'>
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
