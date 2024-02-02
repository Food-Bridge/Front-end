import React from 'react'
import './StoreList.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import MenuBar from '../../components/MenuBar/MenuBar'
import Category from '../../components/Category/Category'
import CategoryBar from '../../components/CategoryBar/CategoryBar'
import StoreTagList from '../../components/StoreTagList/StoreTagList'
import StoreCardList from '../../components/StoreCardList/StoreCardList'
import ImageSlider from '../../components/ImageSlider/ImageSlider'
import SliderTime from '../../SliderTime/SliderTime'
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData'

function StoreList() {

  return (
    <div className='StoreList'>
      <div className='storeList-header'>
        <div className="storeList-searchBar"><SearchBar location={"강남구"}/></div>
        <div className='storeList-imageSlider'><SliderTime className="storeList-img1" slides={SliderImgData} /></div>
        <div className="storeList-menuBar"><MenuBar name={"menuBar-pageLine2"}/></div>
      </div>
      <div className='storeList-category'>
        <div className='storeList-categoryComp'>
          <CategoryBar />       
        </div>
      </div>
      <div className='storeList-storeTag'>
        <div className='storeList-storeTag'>
          <StoreTagList />
        </div>
      </div>
      <div className='storeList-storeCard'>
        <div className='storeList-storeCardComp'>
          <StoreCardList />
        </div>
      </div>
    </div>
  )
}

export default StoreList
