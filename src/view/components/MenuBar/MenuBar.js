import React from 'react';
import "./MenuBar.scss";
import { useNavigate } from 'react-router-dom';

function MenuBar({name}) {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
      };
    const handleStoreClick = () => {
    navigate('/storeList');
    };
    const handleCommuClick = () => {
    navigate('/commu');
    };

    return (
        <div className='menuBar'>
            <header className='menuBar-frame'>
                <div className='menuBar-margin'>
                    <button onClick={handleHomeClick}><h1 className='menuBar-home' >홈</h1></button>
                    <button onClick={handleStoreClick}><h1 className='menuBar-deliver'>배달/포장</h1></button>
                    <button onClick={handleCommuClick}><h1 className='menuBar-commu'>커뮤니티</h1></button>
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
