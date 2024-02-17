import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Community.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import MenuBar from '../../components/MenuBar/MenuBar'
import SliderTime from '../../SliderTime/SliderTime'
import { SliderImgData } from '../../../data/StoreListSliderImg/SliderImgData'
import CommunityCard from '../../components/CommunityCard/CommunityCard'
import { MiniPostData } from '../../../data/MiniPostData/MiniPostData'

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
                {MiniPostData.map((el) => {
                    return <CommunityCard user={el.user} location={el.location} img={el.img} text={el.text} className={el.className}/>
                })}
            </div>
        </div>
        <div className='community-dailySection'>
            <div className='community-dailyHeader'>
                <div className='community-dailyTitle'>일간 인기 글</div>
                <button onClick={handleMoreClick2} className='community-dailyMoreBtn'>더보기</button>
            </div>
            <div className='community-dailyMiniPost'>
                {MiniPostData.map((el) => {
                    return <CommunityCard user={el.user} location={el.location} img={el.img} text={el.text} className={el.className}/>
                })}
            </div>
        </div>
        <div className='community-newestSection'>
            <div className='community-newestHeader'>
                <div className='community-newestTitle'>최신 글</div>
                <button onClick={handleMoreClick3} className='community-newestMoreBtn'>더보기</button>
            </div>
            <div className='community-newestMiniPost'>
                {MiniPostData.map((el) => {
                    return <CommunityCard user={el.user} location={el.location} img={el.img} text={el.text} className={el.className}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default Community
