import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Community.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import MenuBar from '../../components/MenuBar/MenuBar'
import SliderTime from '../../SliderTime/SliderTime'
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData'
import CommunityCard from '../../components/CommunityCard/CommunityCard'
import { MiniPostData } from '../../../data/MiniPostData/MiniPostData'
import axios from 'axios';

function Community() {
    const navigate = useNavigate();

    const handleMoreClick = () => {
        navigate('/commuPostWeek');
    };
    const handleMoreClick2 = () => {
        navigate('/commuPostDay');
    };
    const handleMoreClick3 = () => {
        navigate('/commuPostNew');
    };

    const visiblePostCount = 2;

    const [postData, setPostData] = useState([]);

    useEffect(() => {
      // Axios를 사용하여 GET 요청을 보냄
      axios.get('http://localhost:8000/community/')
        .then(response => {
          // 성공적으로 데이터를 받아온 경우 state를 업데이트
          console.log(response)
          setPostData(response.data.results);
          console.log('postData ids:', response.data.results.map(post => post.id));
        })
        .catch(error => {
          // 오류 처리
          console.error('Error fetching data:', error);
        });
    }, []);

  return (
    <div className='Community'>
        <SearchBar />
        <div className='community-imageSlider'><SliderTime className="storeList-img1" slides={SliderImgData} /></div>
        <div className='community-menuBar'><MenuBar name={"menuBar-pageLine3"}/></div>
        <div className='community-weekSection'>
            <div className='community-weekHeader'>
                <div className='community-weekTitle'>주간 인기 글</div>
                <button onClick={handleMoreClick} className='community-weekMoreBtn'>더보기</button>
            </div>
            <div className='community-weekMiniPost'>
                {postData.slice(0, visiblePostCount).map(post => (
                    <CommunityCard user={post.author} id={post.id} content={post.content} img={post.image}/>
                ))}
            </div>
        </div>
        <div className='community-dailySection'>
            <div className='community-dailyHeader'>
                <div className='community-dailyTitle'>일간 인기 글</div>
                <button onClick={handleMoreClick2} className='community-dailyMoreBtn'>더보기</button>
            </div>
            <div className='community-dailyMiniPost'>
                {postData.slice(0, visiblePostCount).map(post => (
                    <CommunityCard user={post.author} id={post.id} content={post.content} img={post.image}/>
                ))}
            </div>
        </div>
        <div className='community-newestSection'>
            <div className='community-newestHeader'>
                <div className='community-newestTitle'>최신 글</div>
                <button onClick={handleMoreClick3} className='community-newestMoreBtn'>더보기</button>
            </div>
            <div className='community-newestMiniPost'>
                {postData.slice(0, visiblePostCount).map(post => (
                    <CommunityCard user={post.author} id={post.id} content={post.content} img={post.image}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Community
