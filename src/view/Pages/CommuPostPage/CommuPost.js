import React from 'react'
import './CommuPost.scss'
import LogoBar from '../../components/LogoBar/LogoBar'
import SearchBar from '../../components/SearchBar/SearchBar'
import MenuBar from '../../components/MenuBar/MenuBar'
import StoreTagList from '../../components/StoreTagList/StoreTagList'
import CommunityCard from '../../components/CommunityCard/CommunityCard'
import PostCard from '../../components/PostCard/PostCard'
import { postCardData } from '../../../data/PostCardData/PostCardData'

function CommuPost() {
  return (
    <div className='CommuPost'>
        <SearchBar location={"강남구"}/>
        <div className='commuPost-menuBar'><MenuBar name={"menuBar-pageLine3"}/></div>
        <div className='commuPost-tagBar'><StoreTagList /></div>
        <div className='commuPost-postSection'>
          <div className='commuPost-title'>주간 인기 글</div>
          <div className='commuPost-postList'>
            {postCardData.map((el) => {
                return <PostCard postImg={el.img} postWriting={el.post} postTitle={el.title}/>
            })} 
          </div>
        </div>
    </div>
  )
}

export default CommuPost;
