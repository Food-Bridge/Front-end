import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/instance';
import { useParams } from 'react-router-dom';
import './StoreOption.scss';
import MenuOptionBtn from '../../components/MenuOptionBtn/MenuOptionBtn';
import MenuCheckBox from '../../components/MenuCheckBox/MenuCheckBox';
import CartAddBtn from '../../components/CartAddBtn/CartAddBtn';

export default function StoreOption() {
  const { resId, menuId } = useParams();
  const cachedData = JSON.parse(localStorage.getItem('cachedData')) || {};
  const cachedMenuData =
    JSON.parse(localStorage.getItem('cachedMenuData')) || {};
  const data = Object.values(cachedData).find(
    (item) => item.id === parseInt(resId)
  );
  const menuData = Object.values(cachedMenuData).find(
    (item) => item.id === parseInt(menuId)
  );
  const [optionData, setOptionData] = useState([]);
  const [sOptionData, setSOptionData] = useState([]);
  const [option, setOption] = useState([]);
  const [sOption, setSOption] = useState([]);
  const isRequiredCount =
    option && menuData.required_options_count === option.length;

  const price =
    menuData.price +
    (option ? option.reduce((a, b) => a + b.price, 0) : 0) +
    (sOption ? sOption.reduce((a, b) => a + b.price, 0) : 0);

  const menuInfo = {
    id: menuData.id,
    image: menuData.image,
    name: menuData.name,
    option: option,
    sOption: sOption,
    price: price,
    restaurant: menuData.restaurant,
  };

  useEffect(() => {
    const fetchOptionData = async () => {
      const optionRes = await axiosInstance.get(
        `/restaurant/${resId}/menu/${menuId}/options`
      );
      const sOptionRes = await axiosInstance.get(
        `restaurant/${resId}/menu/${menuId}/soptions`
      );
      setOptionData(optionRes.data);
      setSOptionData(sOptionRes.data);
    };
    fetchOptionData();
  }, [resId, menuId]);

  const handleOptionChange = (selectedOption) => {
    setOption(selectedOption);
  };

  const handleSOptionChange = (selectedSOption) => {
    setSOption(selectedSOption);
  };

  return (
    <div className='storeOption'>
      <img src={menuData.image} alt='메뉴이미지' className='storeOption-img' />
      <div className='storeOption-title'>
        {menuData.is_popular && (
          <div className='storeOption-tag'>
            <p className='storeOption-tag-title'>인기</p>
          </div>
        )}
        {menuData.is_main && (
          <div className='storeOption-tag'>
            <p className='storeOption-tag-title'>메인</p>
          </div>
        )}
        <h1 className='storeOpiton-name'>{menuData.name}</h1>
      </div>
      <p className='storeOption-detail'>{menuData.content}</p>
      {menuData.required_options_count === 1 ? (
        <MenuOptionBtn data={optionData} onOptionChange={handleOptionChange} />
      ) : (
        <MenuCheckBox
          data={optionData}
          count={menuData.required_options_count}
          onOptionChange={handleOptionChange}
        />
      )}
      {sOptionData.length > 0 && (
        <MenuCheckBox data={sOptionData} onOptionChange={handleSOptionChange} />
      )}
      {!isNaN(price) && (
        <CartAddBtn
          data={data}
          menuData={menuInfo}
          isRequiredCount={isRequiredCount}
        />
      )}
    </div>
  );
}
