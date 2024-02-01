import React from 'react'
import './StoreCardList.scss'
import StoreCard from '../StoreCard/StoreCard'

function StoreCardList() {

  const dataArr = [
    {
        className: "StoreCard-margin",
        storeName: "ooo치킨 oo점",
        minimumPrice: "20,000",
        deliverPrice: "2,000",
        storeScore: "4.5",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVJ7hnsvl92es433v7D4NmnVbfM3s3Lp9ww&usqp=CAU",
    },
    {
        className: "StoreCard",
        storeName: "ooo치킨 oo점",
        minimumPrice: "20,000",
        deliverPrice: "2,000",
        storeScore: "4.5",
        img: "https://images.pexels.com/photos/19144414/pexels-photo-19144414.jpeg",
    },
  ]
  const dataArr2 = [
    {
        className: "StoreCard-margin",
        storeName: "ooo치킨 oo점",
        minimumPrice: "20,000",
        deliverPrice: "2,000",
        storeScore: "4.5",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVJ7hnsvl92es433v7D4NmnVbfM3s3Lp9ww&usqp=CAU",
    },
    {
        className: "StoreCard",
        storeName: "ooo치킨 oo점",
        minimumPrice: "20,000",
        deliverPrice: "2,000",
        storeScore: "4.5",
        img: "https://images.pexels.com/photos/19144414/pexels-photo-19144414.jpeg",
    },
  ]
  const dataArr3 = [
    {
        className: "StoreCard-margin",
        storeName: "ooo치킨 oo점",
        minimumPrice: "20,000",
        deliverPrice: "2,000",
        storeScore: "4.5",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVJ7hnsvl92es433v7D4NmnVbfM3s3Lp9ww&usqp=CAU",
    },
    {
        className: "StoreCard",
        storeName: "ooo치킨 oo점",
        minimumPrice: "20,000",
        deliverPrice: "2,000",
        storeScore: "4.5",
        img: "https://images.pexels.com/photos/19144414/pexels-photo-19144414.jpeg",
    },
  ]


  return (
    <div className='StoreCardList'>
      <div className='storeCardList-card'>
        <div className='storeCardList-cardComp'>
          {dataArr.map((el) => {
            return <StoreCard img={el.img} className={el.className} storeName={el.storeName} minimumPrice={el.minimumPrice} deliverPrice={el.deliverPrice} storeScore={el.storeScore}/>
          })}          
        </div>
        <div className='storeCardList-cardComp2'>
          {dataArr2.map((el) => {
            return <StoreCard img={el.img} className={el.className} storeName={el.storeName} minimumPrice={el.minimumPrice} deliverPrice={el.deliverPrice} storeScore={el.storeScore}/>
          })}          
        </div>
        <div className='storeCardList-cardComp3'>
          {dataArr3.map((el) => {
            return <StoreCard img={el.img} className={el.className} storeName={el.storeName} minimumPrice={el.minimumPrice} deliverPrice={el.deliverPrice} storeScore={el.storeScore}/>
          })}          
        </div>
      </div>
    </div>
  )
}

export default StoreCardList;
