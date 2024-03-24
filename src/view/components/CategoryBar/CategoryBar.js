import React from 'react';
import './CategoryBar.scss';
import Category from '../../components/Category/Category';

function CategoryBar({setCategory}) {
  const dataArr = [
    {
      id: 0,
      category: '전체',
      image: 'https://cdn-icons-png.flaticon.com/512/2951/2951372.png',
    },
    {
      id: 1,
      category: '한식',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5SsTfRyHJ2Dr56cutRnf2efxfaQamdHqtWvUF-VrRARC5fH9ZUJfpWSvqPtNcN9kZFQ&usqp=CAU',
    },
    {
      id: 2,
      category: '중식',
      image:
        'https://mblogthumb-phinf.pstatic.net/MjAxODA2MjZfMjE2/MDAxNTI5OTg2MzU1NTI4.49f_7LCihB7L2Fg9v8mM_NthRjtueE1y5AKXyXM46YAg.Lc4YL8t6fAbZ2X5jKmHH8_oXzqK4K0DiQLgqIGfurXcg.JPEG.yunmilike83/output_285959496.jpg?type=w800',
    },
    {
      id: 3,
      category: '일식',
      image:
        'https://d12zq4w4guyljn.cloudfront.net/750_750_20220506102505_photo1_9bd38c86ab74.jpg',
    },
    {
      id: 4,
      category: '양식',
      image:
        'https://st4.depositphotos.com/18508348/23001/i/1600/depositphotos_230012924-stock-photo-spaghetti-pasta-tomato-sauce-parmesan.jpg',
    },
    {
      id: 5,
      category: '분식',
      image:
        'https://blog.kakaocdn.net/dn/bYsHRV/btqG6gHNXvN/DE3iOOga5l52RYQFAPskX0/img.jpg',
    },
    {
      id: 6,
      category: '디저트',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqRFGC9UzRphyLINSCOd2ZhDpgBMSaJO0TxA&usqp=CAU',
    },
  ];

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
