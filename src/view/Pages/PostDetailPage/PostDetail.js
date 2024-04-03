import React, { useEffect, useState } from 'react';
import './PostDetail.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import DetailPost from '../../components/DetailPost/DetailPost';
import PostComment from '../../components/PostComment/PostComment';
import PostCommentInput from '../../components/PostCommentInput/PostCommentInput';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/instance';
import Swal from 'sweetalert2';

function PostDetail() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get(`/community/${id}/`)
        .then(async (res) => {
          setPostData(res.data);
          await axiosInstance
            .get(`/community/${id}/comment`)
            .then((res) => {
              setCommentData(res.data);
              console.log(commentData);
            })
            .catch((error) =>
              Swal.fire({
                icon: 'warning',
                title: '알림',
                html: '오류가 발생했습니다.<br>다시 시도해주세요.',
                confirmButtonText: '확인',
                confirmButtonColor: 'black',
              }).then((res) => {
                res.isConfirmed && navigate('/commu/');
              })
            );
        })
        .catch((error) =>
          Swal.fire({
            icon: 'warning',
            title: '알림',
            html: '오류가 발생했습니다.<br>다시 시도해주세요.',
            confirmButtonText: '확인',
            confirmButtonColor: 'black',
          }).then((res) => {
            res.isConfirmed && navigate('/commu/');
          })
        );
    };
    fetchData();
  }, [id]);

  return (
    <div className='PostDetail'>
      <SearchBar />
      <div className='postDetail-menuBar'>
        <MenuBar name={'menuBar-pageLine3'} />
      </div>
      {postData && <DetailPost data={postData} />}

      <div className='postDetail-comment'>
        <PostCommentInput id={id} />
        <div className='postDetail-commentList'>
          {commentData &&
            commentData.map((comment) => (
              <PostComment postId={id} data={comment} key={comment.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
