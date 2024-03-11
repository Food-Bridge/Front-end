import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/instance';
import { useParams } from 'react-router-dom';
import './StoreOption.scss';

import MenuOptionBtn from '../../components/MenuOptionBtn/MenuOptionBtn';
import MenuCheckBox from '../../components/MenuCheckBox/MenuCheckBox';

export default function StoreOption() {
  const [quantity, setQuantity] = useState(Number(1));
  const { resId, menuId } = useParams();
  const [data, setData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [optionData, setOptionData] = useState([]);
  const [sOptionData, setSOptionData] = useState([]);

  const [option, setOption] = useState('');
  const [sOption, setSOption] = useState([]);

  const totalPrice =
    (menuData.price +
      (option ? option.reduce((a, b) => a + b.price, 0) : 0) +
      (sOption ? sOption.reduce((a, b) => a + b.price, 0) : 0)) *
    quantity;

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

  const handleOptionChange = (option) => {
    setOption(option);
  };

  const handleSOptionChange = (sOption) => {
    setSOption(sOption);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQunatity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
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
        <MenuOptionBtn data={optionData} onOptionChange={handleOptionChange} />
      ) : (
        <MenuCheckBox
          data={optionData}
          count={menuData.required_options_count}
          onOptionChange={handleOptionChange}
        />
      )}
      <MenuCheckBox data={sOptionData} onOptionChange={handleSOptionChange} />
      <div className='storeOption-footer'>
        <div className='storeOption-footerL'>
          <div className='storeOption-quantity'>
            <button className='storeOption-minus' onClick={decreaseQunatity}>
              -
            </button>
            <p className='storeOption-quantityNum'>{quantity}</p>
            <button className='storeOption-plus' onClick={increaseQuantity}>
              +
            </button>
          </div>
          <div className='storeOption-least'>
            <h1 className='storeOption-leastTitle'>최소 주문 금액</h1>
            <p className='storeOption-leastPrice'>
              {data.minimumOrderPrice
                ? data.minimumOrderPrice.toLocaleString('ko-KR') + '원'
                : ''}
            </p>
          </div>
        </div>

        <button className='storeOption-add'>
          {totalPrice.toLocaleString('ko-KR')}원 담기
        </button>
      </div>
    </div>
  );
}
