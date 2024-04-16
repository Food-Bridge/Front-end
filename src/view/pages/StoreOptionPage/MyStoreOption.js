import React, { useState, useEffect } from 'react';
import './StoreOption.scss';
import axiosInstance from '../../../api/instance';
import { useNavigate, useParams } from 'react-router-dom';
import MenuOptionBtn from '../../components/MenuOptionBtn/MenuOptionBtn';
import MenuCheckBox from '../../components/MenuCheckBox/MenuCheckBox';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import { selectOwner } from '../../../redux/reducers/authSlice';

export default function MyStoreOption() {
  const { menuId } = useParams();
  const owner = useSelector(selectOwner);
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState([]);
  const [optionData, setOptionData] = useState([]);
  const [sOptionData, setSOptionData] = useState([]);
  const [option, setOption] = useState([]);
  const [sOption, setSOption] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOptionChange = (selectedOption) => {
    setOption(selectedOption);
  };

  const handleSOptionChange = (selectedSOption) => {
    setSOption(selectedSOption);
  };

  useEffect(() => {
    const fetchData = async () => {
      const menuRes = await axiosInstance.get(
        `/restaurant/${owner}/menu/${menuId}/`
      );
      const optionRes = await axiosInstance.get(
        `/restaurant/${owner}/menu/${menuId}/options/`
      );
      const sOptionRes = await axiosInstance.get(
        `restaurant/${owner}/menu/${menuId}/soptions/`
      );
      setMenuData(menuRes.data);
      setOptionData(optionRes.data);
      setSOptionData(sOptionRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddOption = () => {
    navigate(`/optionUpload/${menuId}/option`);
  };

  const handleAddSOption = () => {
    navigate(`/optionUpload/${menuId}/soption`);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className='storeOption'>
      <img src={menuData.image} className='storeOption-img' alt='메뉴 이미지' />
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
            type={'option'}
            onOptionChange={handleOptionChange}
            id={menuId}
            isSeller
            setOptionData={setOptionData}
          />
        ) : (
          <MenuCheckBox
            data={optionData}
            type={'option'}
            count={menuData.required_options_count}
            id={menuId}
            onOptionChange={handleOptionChange}
            isSeller
            setOptionData={setOptionData}
          />
        ))}
      {sOptionData.length > 0 && (
        <MenuCheckBox
          data={sOptionData}
          type={'soption'}
          id={menuId}
          onOptionChange={handleSOptionChange}
          setOptionData={setSOptionData}
        />
      )}
      <div className='storeOption-buttons'>
        <button className='storeOption-btn' onClick={handleAddOption}>
          필수 옵션 추가
        </button>
        <button className='storeOption-btn' onClick={handleAddSOption}>
          선택 옵션 추가
        </button>
      </div>
    </div>
  );
}
