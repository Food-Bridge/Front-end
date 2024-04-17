import React, { useState } from 'react';
import './PostComment.scss';
import Swal from 'sweetalert2';
import axiosInstance from '../../../api/instance';
import { useGetId } from '../../../api/useGetId';

const PostComment = ({ data, postId }) => {
  const currentUser = useGetId();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(data.content);

  const handleDeletePost = () => {
    axiosInstance
      .delete(`/community/${postId}/comment/${data.id}/`)
      .then(
        Swal.fire({
          icon: 'warning',
          title: '댓글 삭제',
          html: '댓글을 정말로 삭제하시겠습니까?.',
          showCancelButton: true,
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
          confirmButtonColor: '#ca0000',
          cancelButtonColor: 'black',
        }).then((res) => {
          res.isConfirmed && window.location.reload();
        })
      )
      .catch((error) => {
        Swal.fire({
          icon: 'warning',
          title: '알림',
          html: '댓글이 정상적으로 삭제되지 않았습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        });
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(data.content);
  };

  const handleUpdatePost = () => {
    axiosInstance
      .patch(`/community/${postId}/comment/${data.id}/`, {
        content: editedContent,
      })
      .then(
        Swal.fire({
          icon: 'success',
          title: '수정 완료',
          html: '댓글이 정상적으로 수정되었습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        }).then((res) => res.isConfirmed && window.location.reload())
      )
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'warning',
          title: '알림',
          html: '댓글이 정상적으로 수정되지 않았습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        });
      });
  };

  return (
    <div className='PostComment'>
      <div className='postComment-frame'>
        <div className='postComment-top'>
          <div className='postComment-userInfo'>
            <img
              className='postComment-profile'
              src='http://localhost:8000/media/default.png' alt='프로필 이미지'
            />
            <div className='postComment-userName'>
              {data.author_info ? data.author_info.nickname : '닉네임'}
            </div>
          </div>
          <div className='postComment-headerRight'>
            {currentUser === data.author &&
              <>
                <button
                  className='postComment-button'
                  onClick={isEditing ? handleCancelEdit : handleEdit}
                >
                  {isEditing ? '취소' : '수정'}
                </button>
                <button
                  className='postComment-button'
                  onClick={isEditing ? handleUpdatePost : handleDeletePost}
                >
                  {isEditing ? '완료' : '삭제'}
                </button>
              </>
            }
          </div>
        </div>
        <div className='postComment-commentFrame'>
          {isEditing ? (
            <input
              type='text'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className='postComment-editInput'
            />
          ) : (
            <p className='postComment-comment'>{data.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
