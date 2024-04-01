import React from 'react';
import './CategoryBar.scss';
import dataArr from '../../../data/CategoryData/CategoryData'
import Category from '../../components/Category/Category';

function CategoryBar({setCategory}) {
  return (
    <div className='CategoryBar'>
      <div className='categoryBar-category'>
        <div className='categoryBar-categoryComp'>
          {dataArr.map((el, index) => {
            return (
              <Category
                category={el.category}
                key={index}
                image={el.image}
                onPress={() => setCategory(el.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryBar;
