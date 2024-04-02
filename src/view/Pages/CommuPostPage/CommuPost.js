import React, { useEffect, useState } from 'react';
import './CommuPost.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import PostCard from '../../components/PostCard/PostCard';
import { LuPencilLine } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/instance';

function CommuPost({ title }) {
  const navigate = useNavigate();
  let type;
  if (title === '주간 인기') {
    type = 'weekly';
  } else if (title === '일간 인기') {
    type = 'daily';
  } else if (title === '최신') {
    type = 'latest';
  }

  const handleEditClick = () => {
    navigate('/postUpload/');
  };

  const handleCardClick = (id) => {
    navigate(`/postCard/${id}`);
  };

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/community/${type}/`).then((response) => {
      setPostData(response.data);
    });
  }, []);

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
          {postData.length > 0 ? (
            postData.map((post) => (
              <button
                onClick={() => {
                  handleCardClick(post.id);
                }}
                key={post.id}
              >
                <PostCard
                  user={post.author}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  image={post.image}
                  likeCount={post.likes_count}
                  views={post.views}
                />
              </button>
            ))
          ) : (
            <p className='commuPost-nothing'>게시글이 존재하지 않습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommuPost;
