import React from 'react'
import './StoreTag.scss'

function StoreTag({storeTag}) {
  return (
    <div className='StoreTag'>
        <header className='storeTag-frame'>
            <div className='storeTag-text'># {storeTag}</div>
        </header>
    </div>
  )
}

export default StoreTag
