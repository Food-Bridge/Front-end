import React, { useRef, useState } from 'react';
import './ReviewUpload.scss';
import { CiImageOn } from 'react-icons/ci';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../../api/instance';

function ReviewUpload() {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [content, setContent] = useState('')
  const formData = new FormData();

  const {
    state: { reviewId: id },
  } = useLocation();

  const imageInput = useRef();

  const onCickImageUpload = () => {
    imageInput.current.click();
  };


  const onChangeContent = (event) => {
    setContent(event.target.value)
    formData.append('content', content);
    console.log(content)

  };

  const onChangeImage = (event) => {
    const { files } = event.target;
    const uploadFile = files[0];
    setImage(uploadFile)
    // formData.append('image', image);
  };

  return (
    <div className='ReviewUpload'>
      <div className='reviewUpload-header'>
        <p className='reviewUpload-headerTitle'>리뷰 작성</p>
      </div>
      <div className='reviewUpload-inputMain'>
        <textarea
          onChange={onChangeContent}
          className='reviewUpload-inputForm'
          type='text'
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
            axiosInstance
              .post(`/order/history/${id}/`, {'content': content, 'id': id})
              .then(function (response) {
                console.log(response);
                navigate('/orderlist/');
              })
              .catch(function (error) {
                console.log(error.response.data);
              });
          }}
        >
          리뷰 글 업로드
        </button>
      </div>
    </div>
  );
}

export default ReviewUpload;
