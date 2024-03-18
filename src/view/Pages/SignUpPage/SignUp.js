import React, { useState, useRef, useEffect } from 'react';
import './SignUp.scss';
import SignUpBtn from '../../components/SignUpBtn/SignUpBtn';
import axiosInstance from '../../../api/instance';
import { useNavigate, useLocation } from 'react-router-dom';


function SignUp() {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [password2Value, setPassword2] = useState('');
  const [phoneNumberValue, setPhoneNumber] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(false);
  const location = useLocation();


  // const handleSignUp = async () => {
  //   try {
  //     await axiosInstance.post('/users/signup/', {
  //       email: emailValue,
  //       username: userNameValue,
  //       password: passwordValue,
  //       password2: password2Value,
  //       phone_number: phoneNumberValue,
  //       is_seller: isSeller,
  //     });
  //     // setSignedUp(true);
  //     navigate('/users/signin/'); // 회원가입 후 로그인 페이지로 이동
  //   } catch (error) {
  //     console.error("Error signing up:", error);
  //   }
  // };
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
  const saveUserSeller = (event) => {
    setIsSeller(event.target.checked);
    console.log(!isSeller)
  };

  const userNameValue = '김00';

// 비밀번호 일치 여부 확인
const [passwordMatch, setPasswordMatch] = useState(true);

const checkPasswordMatch = () => {
  if (passwordValue !== password2Value) {
    setPasswordMatch(false);
  } else {
    setPasswordMatch(true);
  }
};

useEffect(() => {
  checkPasswordMatch();
}, [passwordValue, password2Value]);


// 이메일 형식 확인
const [emailValid, setEmailValid] = useState(true);

const validateEmail = (email) => {
  // 이메일 형식을 검사하는 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const checkEmailValidity = () => {
  setEmailValid(validateEmail(emailValue));
};

useEffect(() => {
  checkEmailValidity();
}, [emailValue]);


// 전화번호
const [phoneValid, setPhoneValid] = useState(true);

const validatePhoneNumber = (phoneNumber) => {
  // 전화번호 형식을 검사하는 정규식 (숫자만으로 이루어진 10자리 또는 11자리)
  const phoneRegex = /^\d{11}$/;
  return phoneRegex.test(phoneNumber);
};

const checkPhoneValidity = () => {
  setPhoneValid(validatePhoneNumber(phoneNumberValue));
};

useEffect(() => {
  checkPhoneValidity();
}, [phoneNumberValue]);


// 비밀번호 형식
const validatePassword = (password) => {
  // 비밀번호 형식을 검사하는 정규식
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  return passwordRegex.test(password);
};

const checkPasswordValidity = () => {
  const isValid = validatePassword(passwordValue);
  setPasswordMatch(isValid); // 비밀번호 형식이 일치하는지 상태 업데이트
};

// 중복 여부 확인
const [emailExists, setEmailExists] = useState(false);
const [phoneExists, setPhoneExists] = useState(false);

const checkExistingEmail = async () => {
  try {
    const response = await axiosInstance.get(`/check-email/${emailValue}`);
    setEmailExists(response.data.exists);
  } catch (error) {
    console.error("Error checking existing email:", error);
  }
};

const checkExistingPhone = async () => {
  try {
    const response = await axiosInstance.get(`/check-phone/${phoneNumberValue}`);
    setPhoneExists(response.data.exists);
  } catch (error) {
    console.error("Error checking existing phone number:", error);
  }
};

useEffect(() => {
  if (emailValue) {
    checkExistingEmail();
  }
}, [emailValue]);

useEffect(() => {
  checkPasswordValidity();
}, [passwordValue]);

useEffect(() => {
  if (phoneNumberValue) {
    checkExistingPhone();
  }
}, [phoneNumberValue]);


  return (
    <>
    {emailExists && <p className="email-exists">이미 존재하는 이메일입니다</p>}
    {phoneExists && <p className="phone-exists">이미 존재하는 전화번호입니다</p>}
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
                {emailValid && <p className="singUp-emailInvalid1">올바른 이메일 형식입니다</p>}
                {!emailValid && <p className="singUp-emailInvalid2">올바른 이메일 형식이 아닙니다</p>}
              </div>
              <div className='signUp-passwdForm'>
                <h1 className='signUp-passwdText'>비밀번호</h1>
                <div className='signUp-inputFlex'>
                  <div className='singUp-passwdInputForm'>
                    <input
                      type='password'
                      id='password'
                      ref={passwordRef}
                      placeholder='영문/숫자/특수문자 혼합 8~20자'
                      className='singUp-passwdInput'
                      value={passwordValue}
                      onChange={saveUserPassword}
                    />
                    {!passwordMatch && (
                      <p className="singUp-passwdInvalid">
                        비밀번호는 영문/숫자/특수문자 혼합 8~20자여야 합니다
                      </p>
                    )}

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
                    {/* {passwordMatch && <p className="singUp-passwdMismatch1">비밀번호가 일치합니다</p>} */}
                    {!passwordMatch && <p className="singUp-passwdMismatch2">비밀번호가 일치하지 않습니다</p>}
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
                {phoneValid && <p className="singUp-phoneInvalid1">올바른 전화번호 형식입니다</p>}
                {!phoneValid && <p className="singUp-phoneInvalid2">올바른 전화번호 형식이 아닙니다</p>}
              </div>

              <input
                type="checkbox"
                checked={isSeller}
                // onChange={(e) => setIsSeller(e.target.checked)}
                onChange={saveUserSeller}
              />
              <label htmlFor="isSeller">판매자로 등록하기</label>

            </div>
            <div className='signUp-btn'>
              <div className='signUp-line'></div>
              <button
                onClick={() => {
                  axiosInstance.post('/users/signup/', {
                    email: emailValue,
                    username: userNameValue,
                    password: passwordValue,
                    password2: password2Value,
                    phone_number: phoneNumberValue,
                    is_seller: isSeller,
                  }, {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    }
                  });

                  handleSignUp();
                }}
              >
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