import React from 'react'
import './StoreList.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import MenuBar from '../../components/MenuBar/MenuBar'
import Category from '../../components/Category/Category'
import CategoryBar from '../../components/CategoryBar/CategoryBar'
import StoreTagList from '../../components/StoreTagList/StoreTagList'
import StoreCardList from '../../components/StoreCardList/StoreCardList'

function StoreList() {

  return (
    <div className='StoreList'>
      <div className='storeList-header'>
        <div className="storeList-searchBar"><SearchBar location={"강남구"}/></div>
        <img className="storeList-img1" src="https://images.unsplash.com/photo-1627662168781-4345690f0bb3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img"/>
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
