import React, {useState, useEffect} from 'react'
import './PostCommentInput.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LuSend } from "react-icons/lu";

function PostCommentInput() {

    const formData = new FormData();
    const navigate = useNavigate();
  
    const onCommentChange = (event) => {
      formData.append('content', event.target.value)
    }


    const id = window.location.href.split('/').reverse()[0]

  return (
    <>
        <div className='postDetail-commentInput'>
            <input onChange={onCommentChange} type="text" className='postDetail-InputBox' placeholder='댓글을 입력해주세요...'/>
            <button
            onClick={() => {
                axios
                .post(`http://localhost:8000/community/${id}/comment/create/`, 
                formData,
                {
                    headers : {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    },
                })
                .then(function (response) {
                    console.log(response);
                    console.log(response.data.results)
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
            }} 
            >
            <LuSend className='postDetail-sendIcon'/>
            </button>
        </div>
    </>
  )
}

export default PostCommentInput
