import React from 'react';

import './MyListBlock.scss'

export default function MyListBlock({icon,text, press}) {
  return (
    <button className='mylistBlock' onClick={press}>
      <div className='mylistBlock-content'>
        {icon}
        <h2 className='mylistBlock-text'>{text}</h2>
      </div>
    </button>
  );
}