import React from 'react';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import './LogoBar.scss';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../../data/foodbridge.jpg';

function LogoBar() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleBackClick = () => {
    if (window.location.pathname === '/') {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/users');
    } else {
      navigate('/users/signin');
    }
  };

  return (
    <div className='LogoBar'>
      <header className='logoBar-frame'>
        <div className='logoBar-margin'>
          <button className='logoBar-back' onClick={handleBackClick} aria-label='뒤로 가기'>
            <IoIosArrowBack className='logoBar-backIcon' />
          </button>
          <button className='logoBar-logo' onClick={handleHomeClick} aria-label='홈'>
            <img className='logoBar-logoImage' src={logoImg} alt='로고이미지' />
          </button>
          <button className='logoBar-user' onClick={handleUserClick} aria-label='마이페이지'>
            <FaUser className='logoBar-userIcon' />
          </button>
        </div>
      </header>
    </div>
  );
}

export default React.memo(LogoBar);