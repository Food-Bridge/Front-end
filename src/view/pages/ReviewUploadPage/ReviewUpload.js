import React, { useRef, useState } from 'react';
import './ReviewUpload.scss';
import { CiImageOn } from 'react-icons/ci';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../../api/instance';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

function ReviewUpload() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [caption, setCaption] = useState('');
  const [rating, setRating] = useState(5);
  const formData = new FormData();
  const {
    state: { orderId: id, menuName: menu },
  } = useLocation();

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
    const file = files[0];
    setImage(file);
    formData.append('img', image);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageDisplay(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClickUpload = () => {
    formData.append('caption', caption);
    formData.append('rating', rating);
    formData.append('menu_name', menu);

    axiosInstance
      .post(`/review/${id}/create/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(
        Swal.fire({
          icon: 'success',
          title: '등록 완료',
          html: '리뷰가 성공적으로 등록되었습니다.',
          showCancelButton: false,
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        }).then((res) => {
          res.isConfirmed && navigate('/orderlist/');
        })
      );
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
            <img className='reviewUpload-img' src={imageDisplay} />
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
