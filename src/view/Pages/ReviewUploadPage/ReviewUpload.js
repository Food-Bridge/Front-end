import React, { useRef, useState, useEffect } from 'react';
import './ReviewUpload.scss';
import { CiImageOn } from 'react-icons/ci';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../../api/instance';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import { FaStar } from 'react-icons/fa';

function ReviewUpload() {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [caption, setCaption] = useState('');
  const [rating, setRating] = useState(5);
  const formData = new FormData();
  const {
    state: { orderId: id, menuName: menu },
  } = useLocation();

useEffect(() => {
  const res = axiosInstance.get(`/review/${id}/create/`)
  console.log(res)
})

  const imageInput = useRef();

  const handleImageUpload = () => {
    imageInput.current.click();
  };

  const handleCaptionChange = (event) => {
    const caption = event.target.value;
    setCaption(caption);
  };

  const handleImageChange = (event) => {
    const { files } = event.target;
    const uploadFile = files[0];
    setImage(uploadFile);
  };

  const handleClickUpload = () => {
    formData.append('caption', caption);
    formData.append('rating', rating);
    formData.append('menu_name', menu);
    formData.append('img', image);

    axiosInstance
      .post(`/review/${id}/create/`, formData)
      .then(function (response) {
        console.log(response);
        navigate('/orderlist/');
      });
  };

  return (
    <div className='ReviewUpload'>
      <div className='reviewUpload-header'>
        <p className='reviewUpload-headerTitle'>리뷰 작성</p>
        <div className='reviewUpload-rate'>
          <Rate
            value={rating}
            allowHalf
            character={<FaStar />}
            onChange={(e) => setRating(e)}
          />
        </div>
      </div>
      <div className='reviewUpload-inputMain'>
        <textarea
          onChange={handleCaptionChange}
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
              onChange={handleImageChange}
              ref={imageInput}
            />
            <button onClick={handleImageUpload}>
              <CiImageOn className='reviewUpload-photoIcon' />
            </button>
          </div>
        </div>
      </div>
      <div className='reviewUpload-button'>
        <button
          className='reviewUpload-uploadButton'
          onClick={handleClickUpload}
        >
          리뷰 업로드
        </button>
      </div>
    </div>
  );
}

export default ReviewUpload;
