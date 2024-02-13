import React from 'react'
import './StoreList.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import MenuBar from '../../components/MenuBar/MenuBar'
import CategoryBar from '../../components/CategoryBar/CategoryBar'
import StoreTagList from '../../components/StoreTagList/StoreTagList'
import StoreCardList from '../../components/StoreCardList/StoreCardList'
import SliderTime from '../../SliderTime/SliderTime'
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData'
import { useNavigate } from 'react-router-dom'

function StoreList() {
  const navigate = useNavigate()

  const handleClickStore = () => {
    navigate('/store/')
  }


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
          <button onClick={handleClickStore}><StoreCardList /></button>
        </div>
      </div>
    </div>
  )
}

export default StoreList