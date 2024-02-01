import React from 'react'
import './Category.scss'

function Category({className, category, image}) {
  return (
    <div className={`${className}`}>
        <header className='category-frame'>
            <div className='category-imgBlock'>
              <img className='category-img' src={`${image}`} alt="img" />
            </div>
            <h1 className='category-name'>{category}</h1>
        </header>
    </div>
  )
}

export default Category
