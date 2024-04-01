import React, { useEffect, useState } from 'react'
import './CommuPost.scss'
import LogoBar from '../../components/LogoBar/LogoBar'
import SearchBar from '../../components/SearchBar/SearchBar'
import MenuBar from '../../components/MenuBar/MenuBar'
import StoreTagList from '../../components/StoreTagList/StoreTagList'
import CommunityCard from '../../components/CommunityCard/CommunityCard'
import PostCard from '../../components/PostCard/PostCard'
import { postCardData } from '../../../data/PostCardData/PostCardData'
import { LuPencilLine } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function CommuPost({ title }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
      navigate('/postUpload/');
  };

  const handleCardClick = (id) => {
    navigate(`/postCard/${id}`)
  }

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    // Axios를 사용하여 GET 요청을 보냄
    axios.get('http://localhost:8000/community/')
      .then(response => {
        // 성공적으로 데이터를 받아온 경우 state를 업데이트
        console.log(response)
        setPostData(response.data.results);
        console.log('postData ids:', response.data.results.map(post => post.id));
      })
      .catch(error => {
        // 오류 처리
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='CommuPost'>
        <SearchBar location={"강남구"}/>
        <div className='commuPost-menuBar'><MenuBar name={"menuBar-pageLine3"}/></div>
        <div className='commuPost-tagBar'><StoreTagList /></div>
        <div className='commuPost-postSection'>
          <div className='commuPost-header'>
            <div className='commuPost-title'>{title} 글</div>
            <LuPencilLine className='commuPost-editIcon' onClick={handleEditClick}/>
          </div>
          <div className='commuPost-postList'>
            {postData.map(post => (
                <button onClick={() => {handleCardClick(post.id)}} key={post.id} >
                  <PostCard user={post.author} id={post.id} title={post.title} content={post.content} image={post.image} likeCount={post.likes_count} views={post.views}/>
                </button>
            ))}
          </div>
        </div>
    </div>
  )
}

export default CommuPost;
