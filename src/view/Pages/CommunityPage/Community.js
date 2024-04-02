import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Community.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import SliderTime from '../../components/SliderTime/SliderTime';
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData';
import CommunityCard from '../../components/CommunityCard/CommunityCard';
import Swal from 'sweetalert2';
import axiosInstance from '../../../api/instance';

function Community() {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/commuPostWeek/');
  };
  const handleMoreClick2 = () => {
    navigate('/commuPostDay/');
  };
  const handleMoreClick3 = () => {
    navigate('/commuPostNew/');
  };

  const visiblePostCount = 2;

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/community/')
      .then((response) => {
        setPostData(response.data.results);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'warning',
          title: '알림',
          html: '다시 로그인해주세요.',
          showCancelButton: false,
          confirmButtonText: '확인',
        });
      });
  }, []);

  return (
    <div className='Community'>
      <SearchBar />
      <div className='community-imageSlider'>
        <SliderTime className='storeList-img1' slides={SliderImgData} />
      </div>
      <div className='community-menuBar'>
        <MenuBar name={'menuBar-pageLine3'} />
      </div>
      <div className='community-weekSection'>
        <div className='community-weekHeader'>
          <div className='community-weekTitle'>주간 인기 글</div>
          <button onClick={handleMoreClick} className='community-weekMoreBtn'>
            더보기
          </button>
        </div>
        <div className='community-weekMiniPost'>
          {postData.slice(0, visiblePostCount).map((post) => (
            <CommunityCard
              user={post.author}
              id={post.id}
              content={post.content}
              img={post.image}
            />
          ))}
        </div>
      </div>
      <div className='community-dailySection'>
        <div className='community-dailyHeader'>
          <div className='community-dailyTitle'>일간 인기 글</div>
          <button onClick={handleMoreClick2} className='community-dailyMoreBtn'>
            더보기
          </button>
        </div>
        <div className='community-dailyMiniPost'>
          {postData.slice(0, visiblePostCount).map((post) => (
            <CommunityCard
              user={post.author}
              id={post.id}
              content={post.content}
              img={post.image}
            />
          ))}
        </div>
      </div>
      <div className='community-newestSection'>
        <div className='community-newestHeader'>
          <div className='community-newestTitle'>최신 글</div>
          <button
            onClick={handleMoreClick3}
            className='community-newestMoreBtn'
          >
            더보기
          </button>
        </div>
        <div className='community-newestMiniPost'>
          {postData.slice(0, visiblePostCount).map((post) => (
            <CommunityCard
              user={post.author}
              id={post.id}
              content={post.content}
              img={post.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Community;
