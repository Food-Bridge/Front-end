import React, { useState, useEffect } from 'react';
import './CommuPost.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import PostCard from '../../components/PostCard/PostCard';
import { GoPencil } from '@react-icons/all-files/go/GoPencil';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import axiosInstance from '../../../api/instance';

function CommuPost({ title }) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (title === '주간 인기') {
          const weeklyResponse = await axiosInstance.get('/community/weekly/');
          setPostData(weeklyResponse.data);
        } else if (title === '일간 인기') {
          const dailyResponse = await axiosInstance.get('/community/daily/');
          setPostData(dailyResponse.data);
        } else if (title === '최신') {
          const latestResponse = await axiosInstance.get('/community/latest/');
          setPostData(latestResponse.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch post data", error);
      }
    };
    fetchData();
  }, [title]);

  const handleEditClick = () => {
    navigate('/postUpload/');
  };

  const handleCardClick = (id) => {
    navigate(`/postCard/${id}`);
  };

  return (
    <div className='CommuPost'>
      {loading && <Loading />}

      <SearchBar />
      <div className='commuPost-menuBar'>
        <MenuBar name={'menuBar-pageLine3'} />
      </div>
      <div className='commuPost-postSection'>
        <div className='commuPost-header'>
          <div className='commuPost-title'>{title} 글</div>
          <button className='commuPost-editIcon' onClick={handleEditClick}>
            <GoPencil size='24' />
          </button>
        </div>
        <div className='commuPost-postList'>
          {postData && postData.length > 0 ? (
            postData.map((post) => (
              <button
                key={post.id}
                onClick={() => {
                  handleCardClick(post.id);
                }}
              >
                <PostCard post={post} />
              </button>
            ))
          ) : (
            <p className='commuPost-nothing'>게시물이 존재하지 않습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommuPost;
