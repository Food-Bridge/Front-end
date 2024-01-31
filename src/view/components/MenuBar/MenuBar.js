import React from 'react';
import './MenuBar.scss';
import { useNavigate } from 'react-router-dom';

function MenuBar({ name }) {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/');
  };

  return (
    <div className='menuBar'>
      <header className='menuBar-frame'>
        <div className='menuBar-margin'>
          <button className='menuBar-home' onClick={handleClickHome}>
            홈
          </button>
          <button className='menuBar-deliver'>배달/포장</button>
          <button className='menuBar-commu'>커뮤니티</button>
        </div>
        <div className='menuBar-position'>
          <div className='menuBar-line'>
            <div className={`${name}`}></div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default MenuBar;
