import React from 'react'
import './Category.scss'

function Category({category, image, onPress}) {
  return (
    <button className='Category' onClick={onPress}>
        <header className='category-frame'>
            <div className='category-imgBlock'>
              <img className='category-img' src={image} alt={`${category} 메뉴`} />
            </div>
            <h1 className='category-name'>{category}</h1>
        </header>
    </button>
  )
}

export default Category
