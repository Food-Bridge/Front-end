import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Community.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import SliderTime from '../../components/SliderTime/SliderTime';
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData';
import CommunityCard from '../../components/CommunityCard/CommunityCard';
import axiosInstance from '../../../api/instance';

function Community() {
  const navigate = useNavigate();
  const [weekly, setWeekly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [latest, setLatest] = useState([]);

  const handleMoreClick = () => {
    navigate('/commuPostWeek', { state: { postData: weekly } });
  };
  const handleMoreClick2 = () => {
    navigate('/commuPostDay/', { state: { postData: daily } });
  };
  const handleMoreClick3 = () => {
    navigate('/commuPostNew/', { state: { postData: latest } });
  };

  const visiblePostCount = 2;

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get('/community/weekly/').then((response) => {
        setWeekly(response.data);
      });
      await axiosInstance.get('/community/daily/').then((response) => {
        setDaily(response.data);
      });
      await axiosInstance.get('/community/latest/').then((response) => {
        setLatest(response.data);
      });
    };
    fetchData();
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
          {weekly.length > 0 &&
            weekly
              .slice(0, visiblePostCount)
              .map((post) => <CommunityCard post={post} />)}
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
          {daily.length > 0 &&
            daily
              .slice(0, visiblePostCount)
              .map((post) => (
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
          {latest.length > 0 &&
            latest
              .slice(0, visiblePostCount)
              .map((post) => (
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
