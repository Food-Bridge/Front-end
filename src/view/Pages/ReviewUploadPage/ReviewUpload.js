import React, { useEffect, useRef, useState } from 'react'
import './ReviewUpload.scss'
import { CiImageOn, CiLocationOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReviewUpload() {
  const navigate = useNavigate();

  const imageInput = useRef();
 
  // 버튼클릭시 input태그에 클릭이벤트를 걸어준다. 
  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const formData = new FormData();

  const onChangeContent = (event) => {
    formData.append('content', event.target.value)
  }
  
  const onChangeImage = (event) => {
    const { files } = event.target;
    const uploadFile = files[0];
    formData.append('image', uploadFile);
  }
    const [image, setImage] = useState();
    
  return (
    <div className='ReviewUpload'>
        <div className='reviewUpload-header'>
          <p className='reviewUpload-headerTitle'>리뷰 작성</p>
        </div>
        <div className='reviewUpload-inputMain'>
          <textarea 
            onChange={onChangeContent}
            className='reviewUpload-inputForm' 
            type="text" 
            placeholder='주문하신 가게의 리뷰를 작성해주세요!' 
          />
          <div className='reviewUpload-etcIcons'>
            <div className='reviewUpload-photo'>
                <img className='reviewUpload-img' src={image} />
                <input
                className='reviewUpload-imgUpload'
                id='file'
                type='file'
                accept='image/*'
                onChange={onChangeImage}
                ref={imageInput}
              />
              <button onClick={onCickImageUpload}>
                <CiImageOn className='reviewUpload-photoIcon' />
              </button>
            </div>
          </div>
        </div>
        <div className='reviewUpload-button'>
          <button 
            className='reviewUpload-uploadButton'
            onClick={() => {
              axios
                .post('http://localhost:8000/community/create/', 
                formData,
                {
                  headers : {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                  },
                })
                .then(function (response) {
                  console.log(response);
                  navigate('/commuPostWeek/')
                })
                .catch(function (error) {
                  console.log(error.response.data);
                });
            }} 
          >리뷰 글 업로드</button>
        </div>
    </div>
  )
}

export default ReviewUpload
