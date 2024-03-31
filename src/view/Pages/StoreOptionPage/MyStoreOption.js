import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/instance';
import { useLocation, useNavigate } from 'react-router-dom';
import './MyStoreOption.scss';

import MenuOptionBtn from '../../components/MenuOptionBtn/MenuOptionBtn';
import MenuCheckBox from '../../components/MenuCheckBox/MenuCheckBox';
import { useSelector } from 'react-redux';
import { selectOwner } from '../../../redux/reducers/authSlice';

export default function MyStoreOption() {
  const owner = useSelector(selectOwner);
  const navigate = useNavigate();
  const location = useLocation();
  const menuId = location.state.id;
  const [data, setData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [optionData, setOptionData] = useState([]);
  const [sOptionData, setSOptionData] = useState([]);
  const [option, setOption] = useState([]);
  const [sOption, setSOption] = useState([]);

  const handleOptionChange = (selectedOption) => {
    setOption(selectedOption);
  };

  const handleSOptionChange = (selectedSOption) => {
    setSOption(selectedSOption);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/restaurant/${owner}/`);
      const menuRes = await axiosInstance.get(
        `/restaurant/${owner}/menu/${menuId}/`
      );
      const optionRes = await axiosInstance.get(
        `/restaurant/${owner}/menu/${menuId}/options/`
      );
      const sOptionRes = await axiosInstance.get(
        `restaurant/${owner}/menu/${menuId}/soptions/`
      );
      setData(res.data);
      setMenuData(menuRes.data);
      setOptionData(optionRes.data);
      setSOptionData(sOptionRes.data);
    };
    fetchData();
  }, []);

  const handleAddOption = () => {
    navigate('/optionUpload/', { state: { id: menuId } }); 
  };
  const handleAddSOption = () => {
    navigate('/soptionUpload/', { state: { id: menuId } }); 
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
      {optionData.length > 0 &&
        (menuData.required_options_count === 1 ? (
          <MenuOptionBtn
            data={optionData}
            onOptionChange={handleOptionChange}
            isSeller
          />
        ) : (
          <MenuCheckBox
            data={optionData}
            count={menuData.required_options_count}
            onOptionChange={handleOptionChange}
            isSeller
          />
        ))}
      {sOptionData.length > 0 && (
        <MenuCheckBox data={sOptionData} onOptionChange={handleSOptionChange} />
      )}
      <div className='storeOption-buttons'>
        <button
          className='storeOption-btn'
          onClick={() => navigate('/optionUpload')}
        >
          필수 옵션 추가
        </button>
        <button
          className='storeOption-btn'
          onClick={() => navigate('/soptionUpload')}
        >
          선택 옵션 추가
        </button>
      </div>
    </div>
  );
}
