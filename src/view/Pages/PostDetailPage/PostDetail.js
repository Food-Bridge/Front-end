import React from 'react'
import './PostDetail.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import MenuBar from '../../components/MenuBar/MenuBar'
import DetailPost from '../../components/DetailPost/DetailPost'

function PostDetail() {
  return (
    <div className='PostDetail'>
      <SearchBar />
      <div className="postDetail-menuBar"><MenuBar name={"menuBar-pageLine3"} /></div>
      <DetailPost user={"김선민"} location={"강남역"}  />
      {/* user, location, img, text */}
    </div>
  )    
}

export default PostDetail
