import React from 'react';
import './CategoryBar.scss';
import dataArr from '../../../data/CategoryData/CategoryData'
import Category from '../../components/Category/Category';

function CategoryBar({category, setCategory}) {
  return (
    <div className='CategoryBar'>
      <div className='categoryBar-category'>
          {dataArr.map((el, index) => {
            return (
              <Category
                selected = {category == el.id}
                category={el.category}
                key={index}
                image={el.image}
                onPress={() => setCategory(el.id)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CategoryBar;
