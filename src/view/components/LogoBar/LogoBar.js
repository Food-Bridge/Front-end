import React from 'react';
import { LuUserCircle2 } from 'react-icons/lu';
import { IoIosArrowBack } from 'react-icons/io';
import './LogoBar.scss';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../../data/foodbridge.jpg';

function LogoBar() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleBackClick = () => {
    navigate(-1);
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
            <LuUserCircle2 className='logoBar-userIcon' />
          </button>
        </div>
      </header>
    </div>
  );
}

export default React.memo(LogoBar);