import React, { useState, useEffect } from 'react';
import './SignUp.scss';
import SignUpBtn from '../../components/SignUpBtn/SignUpBtn';
import axiosInstance from '../../../api/instance';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function SignUp() {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [password2Value, setPassword2] = useState('');
  const [phoneNumberValue, setPhoneNumber] = useState('');
  const [userNameValue, setUserName] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const [emailExists, setEmailExists] = useState(false);

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  const saveUserData = (setter) => (event) => {
    setter(event.target.value);
  };

  useEffect(() => {
    setPasswordMatch(passwordValue === password2Value);
  }, [passwordValue, password2Value]);

  const validatePattern = (input, pattern) => {
    return pattern.test(input);
  };

  useEffect(() => {
    setEmailValid(
      validatePattern(
        emailValue,
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )
    );
  }, [emailValue]);

  useEffect(() => {
    setPhoneValid(validatePattern(phoneNumberValue, /^\d{11}$/));
  }, [phoneNumberValue]);

  const validatePassword = (password) => {
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(
      password
    );
  };

  useEffect(() => {
    setPasswordValid(validatePassword(passwordValue));
  }, [passwordValue]);

  useEffect(() => {
    if (
      errorMessage[0] === 'This username is already taken with the same email.'
    ) {
      setEmailExists(true);
    }
  }, [errorMessage]);
  const handleSignUp = async () => {
    try {
      await axiosInstance.post('/users/signup/', {
        email: emailValue,
        username: userNameValue,
        password: passwordValue,
        password2: password2Value,
        phone_number: phoneNumberValue,
        is_seller: isSeller,
      });
      Swal.fire({
        icon: 'info',
        title: '회원가입 성공',
        html: '푸드브릿지의 회원이 되신 것을 축하합니다.<br>다시 로그인 해주세요.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      }).then((res) => {
        res.isConfirmed && navigate('/users/signin/');
      });
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        Swal.fire({
          icon: 'warning',
          title: '회원가입 오류',
          html: '입력된 정보를 확인해주세요.',
          showCancelButton: false,
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        });
      }
    }
  };

  return (
    <>
      <div className='SignUp'>
        <header className='signUp-frame'>
          <h1 className='signUp-title'>회원가입</h1>
          <div className='signUp-flex'>
            <div className='signUp-margin'>
              <div className='signUp-emailForm'>
                <h1 className='signUp-emailText'>이메일</h1>
                <input
                  type='text'
                  placeholder=' example@example.com'
                  className='singUp-emailInput'
                  value={emailValue}
                  onChange={saveUserData(setEmail)}
                />
                {emailValue && !emailValid && (
                  <p className='singUp-emailInvalid'>
                    올바른 이메일 형식이 아닙니다
                  </p>
                )}
                {emailExists && (
                  <p className='singUp-emailInvalid'>
                    이미 존재하는 이메일입니다
                  </p>
                )}
              </div>
              <div className='signUp-passwdForm'>
                <h1 className='signUp-passwdText'>비밀번호</h1>
                <div className='signUp-inputFlex'>
                  <div className='singUp-passwdInputForm'>
                    <input
                      type='password'
                      id='password'
                      placeholder=' 영문/숫자/특수문자 혼합 8~20자'
                      className='singUp-passwdInput'
                      value={passwordValue}
                      onChange={saveUserData(setPassword)}
                    />
                    {passwordValue && !passwordValid && (
                      <p className='singUp-passwdInvalid'>
                        비밀번호는 영문/숫자/특수문자 혼합 8~20자여야 합니다
                      </p>
                    )}

                    <input
                      type='password'
                      id='password2'
                      placeholder=' 비밀번호를 한번 더 입력해주세요'
                      className='singUp-passwdInput2'
                      value={password2Value}
                      onChange={saveUserData(setPassword2)}
                    />
                  </div>
                  {password2Value && !passwordMatch && (
                    <p className='singUp-passwdMismatch'>
                      비밀번호가 일치하지 않습니다
                    </p>
                  )}
                </div>
              </div>
              <div className='signUp-numberForm'>
                <h1 className='signUp-numberText'>전화번호</h1>
                <input
                  type='text'
                  placeholder=' "-"를 제외한 숫자만 입력해주세요'
                  className='singUp-numberInput'
                  value={phoneNumberValue}
                  onChange={saveUserData(setPhoneNumber)}
                />
                {phoneNumberValue && !phoneValid && (
                  <p className='singUp-phoneInvalid'>
                    올바른 전화번호 형식이 아닙니다
                  </p>
                )}
              </div>
              <div className='signUp-userNameForm'>
                <h1 className='signUp-userNameText'>닉네임</h1>
                <input
                  type='text'
                  placeholder=' 닉네임 3글자 이상'
                  className='singUp-userNameInput'
                  value={userNameValue}
                  onChange={saveUserData(setUserName)}
                />
                {userNameValue && userNameValue.length < 3 && (
                  <p className='singUp-userNameInvalid'>
                    3글자 이상 입력해주세요.
                  </p>
                )}
              </div>
              <div className='signUp-isSeller'>
                <label htmlFor='isSeller' className='signUp-isSellerLabel'>
                  판매자 여부
                </label>
                <input
                  className='signUp-isSellerBox'
                  type='checkbox'
                  checked={isSeller}
                  onChange={() => setIsSeller(!isSeller)}
                />
              </div>
            </div>
            <div className='signUp-btn'>
              <div className='signUp-line'></div>
              <button onClick={handleSignUp}>
                <SignUpBtn
                  className='SignUpBtnComp'
                  className1={'signUpBtn-frame1'}
                  className2={'signUpBtn-text1'}
                />
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
export default SignUp;
