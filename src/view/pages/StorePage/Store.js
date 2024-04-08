import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/instance.js';
import './Store.scss';
import StoreDeliverTogo from '../../components/StoreDeliverTogo/StoreDeliverTogo.js';
import MenuBlock from '../../components/MenuBlock/MenuBlock.js';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';
import SearchBar from '../../components/SearchBar/SearchBar';
import PlusInfo from '../../components/PlusInfo/PlusInfo.js';
import RateStars from '../../components/RateStars/RateStars.js';
import Swal from 'sweetalert2'
import { CiPhone } from 'react-icons/ci';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice.js';

export default function Store() {
  const { resId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [likeData, setLikeData] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/restaurant/${resId}/`);
      const menuRes = await axiosInstance.get(`/restaurant/${resId}/menu/`);
      const likeRes = isLoggedIn && await axiosInstance.get('/like/');
      setData(res.data);
      setSliderData(res.data.image);
      setMenuData(menuRes.data);
      isLoggedIn && setLikeData(likeRes.data.liked_restaurants_ids);
    };
    fetchData();
  }, [resId]);

  useEffect(() => {
    setIsLike(likeData.includes(parseInt(resId)));
  }, [likeData, resId]);

  const handleClickHeart = async () => {
    await axiosInstance.post(`/like/${resId}/`);
    setIsLike((prevIsLike) => !prevIsLike);
  };

  const handleOpenReview = () => {
    navigate('review/');
  };

  const showNumber = () => {
    Swal.fire({
      icon: 'info',
      title: '매장 전화번호',
      html: data.phone_number.replace(/^02(\d{3,4})-?(\d{4})$/, '02-$1-$2'),
      showCancelButton: false,
      confirmButtonText: '확인',
      confirmButtonColor: 'black'
    });
  };

  return (
    <div className='store'>
      <SearchBar />
      <div className='store-img'>
        {sliderData && sliderData.length > 0 && (
          <ImageSlider slides={[sliderData]} />
        )}
      </div>
      <div className='store-main'>
        <div className='store-title'>
          <h1 className='store-name'>{data.name}</h1>
          <div className='store-icon'>
            <button className='store-phone' onClick={showNumber}>
              <CiPhone size='30' />
            </button>
            <button className='store-like ' onClick={handleClickHeart}>
              {isLike ? (
                <IoIosHeart size='30' color='red' />
              ) : (
                <IoIosHeartEmpty size='30' color='red' />
              )}
            </button>
          </div>
        </div>
        <div className='store-rate'>
          <RateStars rate={data.averageRating}/>
        </div>
        <div className='store-detailContainer'>
          <div className='store-detail'>
            <h2 className='store-detailText'>찜</h2>
            <p className='store-detailNum'>{data.bookmarkCount}</p>
            <h2 className='store-detailText'>리뷰</h2>
            <p className='store-detailNum'>{data.reviewCount}</p>
            <PlusInfo text='더보기' arrow='true' onClick={handleOpenReview} />
          </div>
        </div>
      </div>

      <StoreDeliverTogo data={data} />
      <div className='store-menu'>
        <h2 className='store-menuTitle'>메뉴</h2>
        <div className='store-menuBlocks'>
          {menuData.map((el) => (
            <div className='store-menuBlock' key={el.id}>
              <MenuBlock
                title={el.name}
                price={el.price}
                image={el.image}
                content={el.content}
                popular={el.is_popular}
                main={el.is_main}
                menuId={el.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
