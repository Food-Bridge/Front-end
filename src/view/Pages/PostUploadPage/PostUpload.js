import React, { useEffect, useRef, useState } from 'react'
import './PostUpload.scss'
import { CiImageOn, CiLocationOn } from "react-icons/ci";
import { RiArrowDropDownFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostUpload() {
  const navigate = useNavigate();
  const locations = [
    '서울시 강남구 역삼로 111',
    '서울시 강남구 역삼로 222',
    '서울시 관악구 봉천로 333',
  ];

  const [location, setLocation] = useState(locations[0]);

  const [showList, setShowList] = useState(false);

  const handleShowList = () => {
    setShowList(!showList);
  };

  const handleSearchClick = () => {
    navigate('/search/');
  };

  const handleControlClick = () => {
    navigate(`address/`);
  };

  const imageInput = useRef();
 
  // 버튼클릭시 input태그에 클릭이벤트를 걸어준다. 
  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const formData = new FormData();

  const onChangeTitle = (event) => {
    formData.append('title', event.target.value);
  }

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
    <div className='PostUpload'>
        <div className='postUpload-header'>
          <p className='postUpload-headerTitle'>글쓰기</p>
        </div>
        <div className='postUpload-title'>
          <input 
            onChange={onChangeTitle}
            className='postUpload-inputTitle' 
            type="text" 
            placeholder='제목을 입력하세요'
          />
        </div>
        <div className='postUpload-inputMain'>
          <textarea 
            onChange={onChangeContent}
            className='postUpload-inputForm' 
            type="text" 
            placeholder='추천하고 싶은 맛집이나 새로 오픈한 가게 정보 등을 커뮤니티를 통해 공유해주세요!' 
          />
          <div className='postUpload-etcIcons'>
            <div className='postUpload-photo'>
                <img className='postUpload-img' src={image} />
                <input
                className='postUpload-imgUpload'
                id='file'
                type='file'
                accept='image/*'
                onChange={onChangeImage}
                ref={imageInput}
              />
              <button onClick={onCickImageUpload}>
                <CiImageOn className='postUpload-photoIcon' />
              </button>
            </div>
            <button className='postUpload-location' onClick={handleShowList}>
              <CiLocationOn className='postUpload-locationIcon' />
              <h1 className='postUpload-locaName'>
                {location.split(' ').slice(1, 2).join(' ')}
            </h1>
            </button>
          </div>
        </div>
        <div className='postUpload-button'>
          <button 
            className='postUpload-uploadButton'
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
          >게시글 업로드</button>
        </div>

        {showList && (
          <div className='postUpload-locaList'>
            {locations.map((address, index) => (
              <button
                key={index}
                className={`postUpload-loca ${
                  location === address ? 'selected' : ''
                }`}
                onClick={() => setLocation(address)}
              >
                {locations[index]}
              </button>
            ))}
            <button
              className='postUpload-loca control'
              onClick={handleControlClick}
            >
              + 주소 관리
            </button>
          </div>
        )}

        
    </div>
  )
}

export default PostUpload
