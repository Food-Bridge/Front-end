import React from 'react';
import "./menuBar.scss";


function MenuBar({name}) {
    // const name = props.name;

    return (
        <div className='menuBar'>
            <header className='menuBar-frame'>
                <div className='menuBar-margin'>
                    <h1 className='menuBar-home'>홈</h1>
                    <h1 className='menuBar-deliver'>배달/포장</h1>
                    <h1 className='menuBar-commu'>커뮤니티</h1>                    
                </div>
                <div className='menuBar-position'>
                    <div className='menuBar-line'>
                        <div className={`${name}`}></div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default MenuBar;
