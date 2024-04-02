import React, { useState } from 'react';
import './CommuPost.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import PostCard from '../../components/PostCard/PostCard';
import { LuPencilLine } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';

function CommuPost({ title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { postData } = location.state;

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
          {postData.length > 0 ? (
            postData.map((post) => (
              <button
                onClick={() => {
                  handleCardClick(post.id);
                }}
                key={post.id}
              >
                <PostCard post={post} />
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
