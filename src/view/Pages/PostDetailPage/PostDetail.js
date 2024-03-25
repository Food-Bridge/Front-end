import React, { useEffect, useState } from 'react'
import './PostDetail.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import MenuBar from '../../components/MenuBar/MenuBar'
import DetailPost from '../../components/DetailPost/DetailPost'
import PostComment from '../../components/PostComment/PostComment'
import axios from 'axios'
import PostCommentInput from '../../components/PostCommentInput/PostCommentInput'


function PostDetail() {
  const [postData, setPostData] = useState([]);
  const id = window.location.href.split('/').reverse()[0] 

  console.log(id)
  console.log(postData)

  useEffect(() => {
    // if () {
      // Axios를 사용하여 GET 요청을 보냄
      axios.get(`http://localhost:8000/community/${id}/`,
      {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then(response => {
          // 성공적으로 데이터를 받아온 경우 state를 업데이트
          console.log(response)
          setPostData(response.data);
          // setPostId(response.data.results.id)
        })
        .catch(error => {
          // 오류 처리
          console.error('Error fetching data:', error);
        });
  }, [id]);


  const [commentData, setCommentDatas] = useState([]);
  console.log(commentData)

  useEffect(() => {
    // Axios를 사용하여 GET 요청을 보냄
    axios.get(`http://localhost:8000/community/${id}/comment/`,
    {
      headers : {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then(response => {
        // 성공적으로 데이터를 받아온 경우 state를 업데이트
        console.log(response)
        setCommentDatas(response.data);
        // console.log(response.id)
        console.log('postData ids:', response.data.results.map(comment => comment.id));
      })
      .catch(error => {
        // 오류 처리
        console.error('Error fetching data:', error);
      });
  }, [id]);

  return (
    <div className='PostDetail'>
      <SearchBar />
      <div className="postDetail-menuBar"><MenuBar name={"menuBar-pageLine3"} /></div>
      <DetailPost
        id={postData.id}
        user={postData.author}
        location={"강남역"}
        title={postData.title}
        image={postData.image}
        content={postData.content}
      />

      <div className='postDetail-comment'>
        <div className='postDetail-commentList'>
          {commentData && commentData.map(comment => (
            <PostComment key={commentData.id} id={commentData.id} commentId={comment.id} content={comment.content} user={comment.author} />
          ))}
        </div>
        
        <PostCommentInput/>

      </div>
    </div>
  )    
}

export default PostDetail
