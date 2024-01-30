import React, { Component } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { LuUserCircle2 } from 'react-icons/lu';
import './LogoBar.scss';
import { useNavigate } from 'react-router-dom';

export default function LogoBar() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleUserClick = () => {
    navigate('/users/signin');
  };
  return (
    <div className='LogoBar'>
      <header className='logoBar-frame'>
        <div className='logoBar-margin'>
          <button className='logoBar-home' onClick={handleHomeClick}>
            <AiOutlineHome className='logoBar-homeIcon' />
          </button>
          <div className='logoBar-logo'>
            <h1 className='logoBar-logoText'>LOGO</h1>
          </div>
          <button className='logoBar-user' onClick={handleUserClick}>
            <LuUserCircle2 className='logoBar-userIcon' />
          </button>
        </div>
      </header>
    </div>
  );
}
