import './Store.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/instance.js';
import Swal from 'sweetalert2';
import StoreDeliverTogo from '../../components/StoreDeliverTogo/StoreDeliverTogo.js';
import MenuBlock from '../../components/MenuBlock/MenuBlock.js';
import PlusInfo from '../../components/PlusInfo/PlusInfo.js';
import RateStars from '../../components/RateStars/RateStars.js';

import { FaPhoneAlt } from '@react-icons/all-files/fa/FaPhoneAlt.js';
import { useSelector } from 'react-redux';
import { selectOwner } from '../../../redux/reducers/authSlice.js';
import Loading from '../../components/Loading/Loading.js';

export default function MyStore() {
  const navigate = useNavigate();
  const owner = useSelector(selectOwner);
  const [data, setData] = useState([]);
  const [storeImg, setStoreImg] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/restaurant/${owner}/`);
      const menuRes = await axiosInstance.get(`/restaurant/${owner}/menu/`);
      setData(res.data);
      setStoreImg(res.data.image);
      setMenuData(menuRes.data);
      setLoading(false);
    };
    fetchData();
  }, [owner]);

  useEffect(() => {
    const img = new Image();
    img.src = storeImg;
  }, [storeImg]);

  useEffect(() => {
    menuData.forEach((menu) => {
      const img = new Image();
      img.src = menu.image;
    });
  }, [menuData]);

  const handleOpenReview = () => {
    navigate('/review/');
  };

  const showNumber = () => {
    Swal.fire({
      icon: 'info',
      title: '매장 전화번호',
      html: data.phone_number.replace(/^02(\d{3,4})-?(\d{4})$/, '02-$1-$2'),
      showCancelButton: false,
      confirmButtonText: '확인',
      confirmButtonColor: 'black',
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className='store'>
      <img className='store-img' src={storeImg} alt='매장 사진' width='600' height='600' />
      <div className='store-main'>
        <div className='store-title'>
          <h1 className='store-name'>{data.name}</h1>
          <div className='store-icon'>
            <button
              className='store-phone'
              onClick={showNumber}
              aria-label='매장 번호'
            >
              <FaPhoneAlt size='24' />
            </button>
          </div>
        </div>
        <div className='store-rate'>
          <RateStars rate={data.rating} />
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
                isSeller
              />
            </div>
          ))}
          <button
            className='store-menuAdd'
            onClick={() => navigate('/menuUpload/')}
          >
            메뉴 추가
          </button>
        </div>
      </div>
    </div>
  );
}
