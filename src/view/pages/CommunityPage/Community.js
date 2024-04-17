import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Community.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData';
import CommunityCard from '../../components/CommunityCard/CommunityCard';
import { GoPencil } from '@react-icons/all-files/go/GoPencil';
import PlusInfo from '../../components/PlusInfo/PlusInfo';
import Loading from '../../components/Loading/Loading'
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
  }, [dispatch]);

  return (
    <div className='Community'>
      {loading && <Loading />}
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
            <GoPencil size='24' />
          </button>
        </div>
        <div className='community-weekMiniPost'>
          {weekly.length > 0 ? (
            weekly
              .slice(0, visiblePostCount)
              .map((post) => <CommunityCard post={post} />)
          ) : (
            <p className='community-nothing'>
              {loading ? '로딩중입니다.' : '게시물이 존재하지 않습니다.'}
            </p>
          )}
        </div>
      </div>
      <div className='community-dailySection'>
        <div className='community-dailyHeader'>
          <div className='community-dailyTitle'>일간 인기 글</div>
          <PlusInfo text='더보기' arrow='true' onClick={handleMoreClick2} />
        </div>
        <div className='community-dailyMiniPost'>
          {daily.length > 0 ? (
            daily
              .slice(0, visiblePostCount)
              .map((post) => <CommunityCard post={post} />)
          ) : (
            <p className='community-nothing'>
              {loading ? '로딩중입니다.' : '게시물이 존재하지 않습니다.'}
            </p>
          )}
        </div>
      </div>
      <div className='community-newestSection'>
        <div className='community-newestHeader'>
          <div className='community-newestTitle'>최신 글</div>
          <PlusInfo text='더보기' arrow='true' onClick={handleMoreClick3} />
        </div>
        <div className='community-newestMiniPost'>
          {latest.length > 0 ? (
            latest
              .slice(0, visiblePostCount)
              .map((post) => <CommunityCard post={post} />)
          ) : (
            <p className='community-nothing'>
              {loading ? '로딩중입니다.' : '게시물이 존재하지 않습니다.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Community;
