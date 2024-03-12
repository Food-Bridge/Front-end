import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/instance';
import { useParams } from 'react-router-dom';
import './StoreOption.scss';

import MenuOptionBtn from '../../components/MenuOptionBtn/MenuOptionBtn';
import MenuCheckBox from '../../components/MenuCheckBox/MenuCheckBox';
import CartAddBtn from '../../components/CartAddBtn/CartAddBtn';

export default function StoreOption() {
  const { resId, menuId } = useParams();
  const [data, setData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [optionData, setOptionData] = useState([]);
  const [sOptionData, setSOptionData] = useState([]);

  const [option, setOption] = useState('');
  const [sOption, setSOption] = useState([]);

  const price =
  (menuData.price +
    (option ? option.reduce((a, b) => a + b.price, 0) : 0) +
    (sOption ? sOption.reduce((a, b) => a + b.price, 0) : 0))

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/restaurant/${resId}`);
      const menuRes = await axiosInstance.get(
        `/restaurant/${resId}/menu/${menuId}`
      );
      const optionRes = await axiosInstance.get(
        `/restaurant/${resId}/menu/${menuId}/options`
      );
      const sOptionRes = await axiosInstance.get(
        `restaurant/${resId}/menu/${menuId}/soptions`
      );
      setData(res.data);
      setMenuData(menuRes.data);
      setOptionData(optionRes.data);
      setSOptionData(sOptionRes.data);
    };
    fetchData();
  }, []);

  const handleOptionChange = (selectedOption) => {
    setOption(selectedOption);
  };

  const handleSOptionChange = (selectedSOption) => {
    setSOption(selectedSOption);
  };

  return (
    <div className='storeOption'>
      <img src={menuData.image} className='storeOption-img' />
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
        <MenuOptionBtn
          data={optionData}
          onOptionChange={handleOptionChange}
        />
      ) : (
        <MenuCheckBox
          data={optionData}
          count={menuData.required_options_count}
          onOptionChange={handleOptionChange}
        />
      )}
      {sOptionData.length > 0 && <MenuCheckBox
        data={sOptionData}
        onOptionChange={handleSOptionChange}
      />}
      <CartAddBtn
        price={price}
        data={data}
        menuData={{ ...menuData, option, sOption }}
      />
    </div>
  );
}
