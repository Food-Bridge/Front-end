import React from 'react'
import './StoreTag.scss'

function StoreTag({className, tagName}) {
  return (
    <div className={className}>
        <header className='storeTag-frame'>
            <div className='storeTag-text'># {tagName}</div>
        </header>
    </div>
  )
}

export default StoreTag
