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
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CommuPost({ title }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
      navigate('/postUpload/');
  };

  // const [ image, setImage ] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8000/community/', {
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching image:', error);
  //     });
  // }, []);

  // const [infor, setInfor] = useState([])

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8000/community/', {
  //       params: {
  //         count: count,
  //         results: results,
  //       }
  //     })
  //     .then((response) => {
  //       console.log(response)
  //       // setInfor([response.data])
  //       setTitle(response.data.title);
  //       setContent(response.data.content);
  //       setImage(response.data.image);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching image:', error);
  //     });
  // }, []);

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    // Axios를 사용하여 GET 요청을 보냄
    axios.get('http://localhost:8000/community/')
      .then(response => {
        // 성공적으로 데이터를 받아온 경우 state를 업데이트
        console.log(response)
        setPostData(response.data.results);
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
              <PostCard title={post.title} content={post.content} image={post.image}/>
            ))}
          </div>
        </div>
    </div>
  )
}

export default CommuPost;
