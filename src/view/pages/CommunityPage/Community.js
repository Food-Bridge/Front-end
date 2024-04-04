import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Community.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData';
import CommunityCard from '../../components/CommunityCard/CommunityCard';
import { LuPencilLine } from 'react-icons/lu';
import PlusInfo from '../../components/PlusInfo/PlusInfo';
import {
  fetchPostData,
  selectDailyPost,
  selectLatestPost,
  selectWeeklyPost,
} from '../../../redux/reducers/communitySlice';
import { useDispatch, useSelector } from 'react-redux';

function Community() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const weekly = useSelector(selectWeeklyPost);
  const daily = useSelector(selectDailyPost);
  const latest = useSelector(selectLatestPost);
  const [loading, setLoading] = useState(true);

  const handleEditClick = () => {
    navigate('/postUpload/');
  };

  const handleMoreClick = () => {
    navigate('/commuPostWeek');
  };
  const handleMoreClick2 = () => {
    navigate('/commuPostDay/');
  };
  const handleMoreClick3 = () => {
    navigate('/commuPostNew/');
  };

  const visiblePostCount = 2;

  useEffect(() => {
    dispatch(fetchPostData());
    setLoading(false);
  }, []);

  return (
    <div className='Community'>
      <SearchBar />
      <div className='community-imageSlider'>
        <ImageSlider mini slides={SliderImgData} />
      </div>
      <div className='community-menuBar'>
        <MenuBar name={'menuBar-pageLine3'} />
      </div>
      <div className='community-weekSection'>
        <div className='community-weekHeader'>
          <div className='community-weekBox'>
            <div className='community-weekTitle'>주간 인기 글</div>
            <PlusInfo text='더보기' arrow='true' onClick={handleMoreClick} />
          </div>
          <button className='community-editIcon' onClick={handleEditClick}>
            <LuPencilLine size='24' />
          </button>
        </div>
        <div className='community-weekMiniPost'>
          {!loading &&
            weekly.length > 0 &&
            weekly
              .slice(0, visiblePostCount)
              .map((post) => <CommunityCard post={post} />)}
        </div>
      </div>
      <div className='community-dailySection'>
        <div className='community-dailyHeader'>
          <div className='community-dailyTitle'>일간 인기 글</div>
          <PlusInfo text='더보기' arrow='true' onClick={handleMoreClick2} />
        </div>
        <div className='community-dailyMiniPost'>
          {!loading &&
            daily.length > 0 &&
            daily
              .slice(0, visiblePostCount)
              .map((post) => <CommunityCard post={post} />)}
        </div>
      </div>
      <div className='community-newestSection'>
        <div className='community-newestHeader'>
          <div className='community-newestTitle'>최신 글</div>
          <PlusInfo text='더보기' arrow='true' onClick={handleMoreClick3} />
        </div>
        <div className='community-newestMiniPost'>
          {!loading &&
            latest.length > 0 &&
            latest
              .slice(0, visiblePostCount)
              .map((post) => <CommunityCard post={post} />)}
        </div>
      </div>
    </div>
  );
}

export default Community;