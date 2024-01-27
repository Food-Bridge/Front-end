import React from 'react';
import './SignUp.scss';
import SignUpBtn from '../../components/SignUpBtn/SignUpBtn';
import LogoBar from '../../components/LogoBar/LogoBar';

function SignUp() {
  return (
    <>
      <LogoBar />
      <div className='SignUp'>
        <header className='signUp-frame'>
          <h1 className='signUp-title'>이메일로 회원가입</h1>
          <div className='signUp-flex'>
            <div className='signUp-margin'>
              <div className='signUp-emailForm'>
                <h1 className='signUp-emailText'>이메일</h1>
                <input
                  type='text'
                  placeholder='example@example.com'
                  className='singUp-emailInput'
                />
              </div>
              <div className='signUp-passwdForm'>
                <h1 className='signUp-passwdText'>비밀번호</h1>
                <div className='signUp-inputFlex'>
                  <input
                    type='text'
                    placeholder='영문/숫자/특수문자 혼합 8~20자'
                    className='singUp-passwdInput'
                  />
                  <input
                    type='text'
                    placeholder='비밀번호를 한번 더 입력해주세요'
                    className='singUp-passwdInput2'
                  />
                </div>
              </div>
              <div className='signUp-numberForm'>
                <h1 className='signUp-numberText'>전화번호</h1>
                <input
                  type='text'
                  placeholder=' "-"를 제외한 숫자만 입력해주세요'
                  className='singUp-numberInput'
                />
              </div>
            </div>
            <div className='signUp-btn'>
              <div className='signUp-line'></div>
              <SignUpBtn
                className='SignUpBtnComp'
                className1={'signUpBtn-frame1'}
                className2={'signUpBtn-text1'}
              />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default SignUp;
