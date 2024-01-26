import React from 'react'
import './Category.scss'

function Category({name}) {
  return (
    <div className='Category'>
        <header className='category-frame'>
            <div className='category-imgBlock'></div>
            <h1 className='category-name'>{name}</h1>
        </header>
    </div>
  )
}

export default Category
