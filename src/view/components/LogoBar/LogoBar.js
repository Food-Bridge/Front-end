import React from 'react';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import './LogoBar.scss';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../../data/foodbridge.jpg';

export default function LogoBar() {
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
          <button className='logoBar-back' onClick={handleBackClick}>
            <IoIosArrowBack className='logoBar-backIcon' />
          </button>
          <button className='logoBar-logo' onClick={handleHomeClick}>
            <img className='logoBar-logoImage' src={logoImg} alt='로고이미지' />
          </button>
          <button className='logoBar-user' onClick={handleUserClick}>
            <FaUser className='logoBar-userIcon' />
          </button>
        </div>
      </header>
    </div>
  );
}
