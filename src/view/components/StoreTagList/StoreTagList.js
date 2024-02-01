import React from 'react'
import './StoreTagList.scss'
import StoreTag from '../StoreTag/StoreTag'

function StoreTagList() {

  const dataArr = [
    {
        tagName: "배달팁 낮아요",
        className: "StoreTag-margin"
    },
    {
        tagName: "1인 주문 가능",
        className: "StoreTag-margin"
    },
    {
        tagName: "쿠폰 사용 가능",
        className: "StoreTag-margin"
    },
    {
        tagName: "재주문 많아요",
        className: "StoreTag"
    },
  ]


  return (
    <div className='StoreTagList'>
      <div className='storeTagList-tag'>
        <div className='storeTagList-tagComp'>
          {dataArr.map((el) => {
            return <StoreTag tagName={el.tagName} className={el.className}/>
          })}          
        </div>
      </div>
    </div>
  )
}

export default StoreTagList;
