import React from 'react'
import './PostDetail.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import MenuBar from '../../components/MenuBar/MenuBar'
import DetailPost from '../../components/DetailPost/DetailPost'
import PostComment from '../../components/PostComment/PostComment'
import { postCommentData } from '../../../data/PostCommentData/PostCommentData'
import { LuSend } from "react-icons/lu";

function PostDetail() {
  return (
    <div className='PostDetail'>
      <SearchBar />
      <div className="postDetail-menuBar"><MenuBar name={"menuBar-pageLine3"} /></div>
      <DetailPost user={"김선민"} location={"강남역"}  />

      <div className='postDetail-comment'>
        <div className='postDetail-commentList'>
          {postCommentData.map((el) => {
            return <PostComment userName={el.userName} comment={el.comment} />
          })}          
        </div>

        <div className='postDetail-commentInput'>
          <input type="text" className='postDetail-InputBox' placeholder='댓글을 입력해주세요...'/>
          <LuSend className='postDetail-sendIcon'/>
        </div>
      </div>

    </div>
  )    
}

export default PostDetail
