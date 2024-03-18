import React, { useState } from 'react';
import './CartAddBtn.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsMenuIn,
  addMenu,
  deleteMenu,
  setCurrentStore,
  setMenuData,
  selectMenu,
} from '../../../redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

const CartAddBtn = ({ price, menuData, data }) => {
  const navigate = useNavigate();
  const menu = useSelector(selectMenu);
  const isMenuIn = useSelector(selectIsMenuIn);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [modal, showModal] = useState(false);

  const modalTitle = '알림'
  const contents = ['장바구니에는 같은 가게의 메뉴만 담을 수 있습니다.', '기존에 담은 메뉴를 삭제하시겠습니까?']

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddCart = () => {
    if (isMenuIn && menu[0]?.restaurant === menuData.restaurant) {
      const existingMenuItem = menu.find(
        (item) =>
          item.id === menuData.id &&
          arraysEqual(item.option, menuData.option) &&
          arraysEqual(item.sOption, menuData.sOption)
      );
      if (existingMenuItem !== undefined) {
        const updatedMenu = menu.map((item) =>
          item.id === existingMenuItem.id &&
          item.option === existingMenuItem.option &&
          item.sOption === existingMenuItem.sOption
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        dispatch(setMenuData(updatedMenu));
      } else {
        dispatch(setMenuData([...menu, { ...menuData, quantity }]));
      }
      dispatch(addMenu());
      showModal(false);
      navigate(-1);
    } else {
      dispatch(setCurrentStore(data));
      if (isMenuIn) {
        showModal(true);
      } else {
        dispatch(setMenuData([{ ...menuData, quantity }]));
        dispatch(addMenu());
        navigate(-1);
      }
    }
  };

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  const handleCancel = () => {
    showModal(false);
  };

  const handleConfirm = () => {
    dispatch(deleteMenu());
    showModal(false);
  };

  return (
    <div>
      <div className='cartAddBtn'>
        <div className='cartAddBtn-quantityGroup'>
          <div className='cartAddBtn-quantity'>
            <button className='cartAddBtn-minus' onClick={decreaseQuantity}>
              -
            </button>
            <p className='cartAddBtn-quantityNum'>{quantity}</p>
            <button className='cartAddBtn-plus' onClick={increaseQuantity}>
              +
            </button>
          </div>
          <div className='cartAddBtn-least'>
            <h1 className='cartAddBtn-leastTitle'>최소 주문 금액</h1>
            <p className='cartAddBtn-leastPrice'>
              {data.minimumOrderPrice
                ? data.minimumOrderPrice.toLocaleString('ko-KR') + '원'
                : ''}
            </p>
          </div>
        </div>

        <button className='cartAddBtn-add' onClick={handleAddCart}>
          {(price * quantity).toLocaleString('ko-KR')}원 담기
        </button>
      </div>
      {modal && (
        <Modal
          contents={contents}
          twoBtn
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          title={modalTitle}
        />
      )}
    </div>
  );
};

export default CartAddBtn;
