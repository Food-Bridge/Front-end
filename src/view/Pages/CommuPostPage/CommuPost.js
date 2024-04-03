import React, { useState, useEffect } from 'react';
import './CommuPost.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import PostCard from '../../components/PostCard/PostCard';
import { LuPencilLine } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostData,
  selectDailyPost,
  selectLatestPost,
  selectWeeklyPost,
} from '../../../redux/reducers/communitySlice';

function CommuPost({ title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState([]);
  const weekly = useSelector(selectWeeklyPost);
  const daily = useSelector(selectDailyPost);
  const latest = useSelector(selectLatestPost);

  useEffect(() => {
    dispatch(fetchPostData()).then(() => {
      if (title === '주간 인기') {
        setPostData(weekly);
      } else if (title === '일간 인기') {
        setPostData(daily);
      } else if (title === '최신') {
        setPostData(latest);
      }
    });
  }, []);

  const handleEditClick = () => {
    navigate('/postUpload/');
  };

  const handleCardClick = (id) => {
    navigate(`/postCard/${id}`);
  };

  return (
    <div className='CommuPost'>
      <SearchBar />
      <div className='commuPost-menuBar'>
        <MenuBar name={'menuBar-pageLine3'} />
      </div>
      <div className='commuPost-postSection'>
        <div className='commuPost-header'>
          <div className='commuPost-title'>{title} 글</div>
          <button className='commuPost-editIcon' onClick={handleEditClick}>
            <LuPencilLine size='24' />
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
