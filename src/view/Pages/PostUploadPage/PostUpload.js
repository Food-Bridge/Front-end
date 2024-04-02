import React, { useState, useRef } from 'react';
import './PostUpload.scss';
import { CiImageOn } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/instance';
import Swal from 'sweetalert2';

function PostUpload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const formData = new FormData();
  const imageInput = useRef();

  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onChangeImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageDisplay(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadBlog = async () => {
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);
    console.log([...formData.entries()]);
    await axiosInstance
      .post('/community/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        Swal.fire({
          icon: 'info',
          title: '등록',
          html: '게시물이 등록되었습니다.',
          showCancelButton: false,
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        }).then(() => navigate('/commu/'));
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'warning',
          title: '알림',
          html: '입력한 데이터를 확인해주세요.',
          showCancelButton: false,
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
        });
      });
  };

  return (
    <div className='PostUpload'>
      <div className='postUpload-header'>
        <p className='postUpload-headerTitle'>글쓰기</p>
      </div>
      <div className='postUpload-title'>
        <input
          onChange={onChangeTitle}
          className='postUpload-inputTitle'
          type='text'
          placeholder='제목을 입력하세요'
        />
      </div>
      <div className='postUpload-inputMain'>
        <textarea
          onChange={onChangeContent}
          className='postUpload-inputForm'
          type='text'
          placeholder='추천하고 싶은 맛집이나 새로 오픈한 가게 정보 등을 커뮤니티를 통해 공유해주세요!'
        />
        <div className='postUpload-etcIcons'>
          <div className='postUpload-photo'>
            {imageDisplay && (
              <img className='postUpload-img' src={imageDisplay} />
            )}
            <input
              ref={imageInput}
              className='postUpload-imgUpload'
              type='file'
              onChange={onChangeImage}
            />
            <button onClick={onCickImageUpload}>
              <CiImageOn className='postUpload-photoIcon' />
            </button>
          </div>
        </div>
      </div>
      <div className='postUpload-button'>
        <button className='postUpload-uploadButton' onClick={handleUploadBlog}>
          게시글 업로드
        </button>
      </div>
    </div>
  );
}

export default PostUpload;
