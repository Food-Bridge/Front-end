import React, { useState, useRef } from 'react';
import './SignUp.scss';
import SignUpBtn from '../../components/SignUpBtn/SignUpBtn';
import LogoBar from '../../components/LogoBar/LogoBar';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function SignUp() {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [password2Value, setPassword2] = useState('');
  const [phoneNumberValue, setPhoneNumber] = useState('');

  const [userIdInput, setUserIdInput] = useState('')
  const [userPwInput, setUserPwInput] = useState('')
  const [isShowPwChecked, setShowPwChecked] = useState(false)
  const passwordRef = useRef(null)

  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(false);

  const handleSignUp = () => {
    setSignedUp(true);

    navigate('/users/signin/');
  };

  const saveUserEmail = (event) => {
    setEmail(event.target.value);
  };
  const saveUserPassword = (event) => {
    setPassword(event.target.value);
  };

  const saveUserPassword2 = (event) => {
    setPassword2(event.target.value);
  };
  const saveUserPhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const userNameValue = '김00';

  return (
    <>
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
                  value={emailValue}
                  onChange={saveUserEmail}
                />
              </div>
              <div className='signUp-passwdForm'>
                <h1 className='signUp-passwdText'>비밀번호</h1>
                <div className='signUp-inputFlex'>
                  <input
                    type='password'
                    id='password'
                    ref={passwordRef}
                    placeholder='영문/숫자/특수문자 혼합 8~20자'
                    className='singUp-passwdInput'
                    value={passwordValue}
                    onChange={saveUserPassword}
                  />
                  <input
                    type='password'
                    id='password'
                    ref={passwordRef}
                    placeholder='비밀번호를 한번 더 입력해주세요'
                    className='singUp-passwdInput2'
                    value={password2Value}
                    onChange={saveUserPassword2}
                  />
                </div>
              </div>
              <div className='signUp-numberForm'>
                <h1 className='signUp-numberText'>전화번호</h1>
                <input
                  type='text'
                  placeholder=' "-"를 제외한 숫자만 입력해주세요'
                  className='singUp-numberInput'
                  value={phoneNumberValue}
                  onChange={saveUserPhoneNumber}
                />
              </div>
            </div>
            <div className='signUp-btn'>
              <div className='signUp-line'></div>

              <div
                onClick={() => {
                  axios
                    .post('http://127.0.0.1:8000/users/signup/', {
                      email: emailValue,
                      username: userNameValue,
                      password: passwordValue,
                      password2: password2Value,
                      phone_number: phoneNumberValue,
                      is_seller: false,
                    })
                    .then(function (response) {
                      console.log(response);
                      handleSignUp()
                    })
                    .catch(function (error) {
                      console.log(error.response.data);
                    });
                }}
              >
                <button>
                  <SignUpBtn
                    className='SignUpBtnComp'
                    className1={'signUpBtn-frame1'}
                    className2={'signUpBtn-text1'}
                  />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default SignUp;