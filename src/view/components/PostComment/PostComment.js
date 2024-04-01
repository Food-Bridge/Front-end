import React, { useEffect, useState } from 'react';
import './PostComment.scss';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostComment = ({ content, user, commentId }) => {
  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    setIsLike(!isLike);
  };

  const id = window.location.href.split('/').reverse()[0];
  const navigate = useNavigate();

  // 댓글 삭제
  const handleDeletePost = () => {
    axios
      .delete(`http://localhost:8000/community/${id}/comment/${commentId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then((response) => {
        console.log('Post deleted successfully:', response);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  // 댓글 수정
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content); // 수정된 내용을 관리할 상태

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content); // 수정 취소 시 원래 내용으로 초기화
  };

  const handleUpdatePost = () => {
    const updatedData = {
      content: editedContent, // 수정된 내용을 업데이트할 데이터로 설정
    };

    axios
      .patch(
        `http://localhost:8000/community/${id}/comment/${commentId}/`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      )
      .then((response) => {
        console.log('Post updated successfully:', response);
        setIsEditing(false); // 수정 완료 후 입력란 감추기
        // 업데이트 성공 시 필요한 로직을 추가하세요.
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  return (
    <div className='PostComment'>
      <div className='postComment-frame'>
        <div className='postComment-top'>
          <div className='postComment-userInfo'>
            <div className='postComment-profile'></div>
            <div className='postComment-userName'> {user} 님</div>
          </div>
          <div className='postComment-headerRight'>
            <button className='postComment-like' onClick={handleLike}>
              {isLike ? (
                <IoIosHeart
                  size='24'
                  color='red'
                  className='postComment-likeIcon'
                />
              ) : (
                <IoIosHeartEmpty
                  size='24'
                  color='red'
                  className='postComment-likeIcon'
                />
              )}
            </button>
            <div className='postComment-editTool'>
              {/* 댓글 수정 */}
              {isEditing ? (
                <>
                  <div className='postComment-updateBtn'>
                    <button
                      className='postComment-cancelEdit'
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    |
                    <button
                      className='postComment-update'
                      onClick={handleUpdatePost}
                    >
                      Update
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className='postComment-deleted'
                    onClick={handleDeletePost}
                  >
                    Delete
                  </button>
                  |
                  <button className='postComment-edit' onClick={handleEdit}>
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='postComment-commentFrame'>
          <h1 className='postComment-comment'>{content}</h1>
          {isEditing ? (
            <>
              <input
                type='text'
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className='postComment-editInput'
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
