import React from 'react';
import './Poster.scss';
import poster from '../../../data/tossPoster.jpg'

function Poster() {
  return (
    <div className='Poster'>
        <img src={poster} alt="posterImg" />
    </div>
  )
}

export default Poster
