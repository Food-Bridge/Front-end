import React from 'react'
import './CategoryBar.scss'
import Category from '../../components/Category/Category'

function CategoryBar() {

  const dataArr = [
    {
      category: "전체",
      className: "Category-margin",
      image: "https://cdn-icons-png.flaticon.com/512/2951/2951372.png",
    },
    {
      category: "한식",
      className: "Category-margin",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5SsTfRyHJ2Dr56cutRnf2efxfaQamdHqtWvUF-VrRARC5fH9ZUJfpWSvqPtNcN9kZFQ&usqp=CAU",
    },
    {
      category: "중식",
      className: "Category-margin",
      image: "https://mblogthumb-phinf.pstatic.net/MjAxODA2MjZfMjE2/MDAxNTI5OTg2MzU1NTI4.49f_7LCihB7L2Fg9v8mM_NthRjtueE1y5AKXyXM46YAg.Lc4YL8t6fAbZ2X5jKmHH8_oXzqK4K0DiQLgqIGfurXcg.JPEG.yunmilike83/output_285959496.jpg?type=w800",
    },
    {
      category: "일식",
      className: "Category-margin",
      image: "https://d12zq4w4guyljn.cloudfront.net/750_750_20220506102505_photo1_9bd38c86ab74.jpg",
    },
    {
      category: "양식",
      className: "Category-margin",
      image: "https://st4.depositphotos.com/18508348/23001/i/1600/depositphotos_230012924-stock-photo-spaghetti-pasta-tomato-sauce-parmesan.jpg",
    },
    {
      category: "분식",
      className: "Category-margin",
      image: "https://blog.kakaocdn.net/dn/bYsHRV/btqG6gHNXvN/DE3iOOga5l52RYQFAPskX0/img.jpg",
    },
    {
      category: "디저트",
      className: "Category",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqRFGC9UzRphyLINSCOd2ZhDpgBMSaJO0TxA&usqp=CAU",
    },
  ]


  return (
    <div className='CategoryBar'>
      <div className='categoryBar-category'>
        <div className='categoryBar-categoryComp'>
          {dataArr.map((el, index) => {
            return <Category category={el.category}  key={index} className={el.className} image={el.image}/>
          })}          
        </div>
      </div>
    </div>
  )
}

export default CategoryBar;
