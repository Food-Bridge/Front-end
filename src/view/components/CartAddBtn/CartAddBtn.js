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
import Modal from '../Modal/Modal';

const CartAddBtn = ({ price, menuData }) => {
  const isMenuIn = useSelector(selectIsMenuIn);
  const menu = useSelector(selectMenu);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [modal, showModal] = useState(false);

  const modalText1 = '장바구니에는 같은 가게의 메뉴만 담을 수 있습니다.';
  const modalText2 = '기존에 담은 메뉴를 삭제하시겠습니까?';

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };
  console.log(menu);
  const handleAddCart = () => {
    if (isMenuIn && menu[0]?.restaurant === menuData.restaurant) {
      const existingMenuItem = menu.find(
        (item) =>
          item.id === menuData.id &&
          item.option === menuData.option &&
          item.sOption === menuData.sOption
      );
      if (existingMenuItem) {
        dispatch(
          setMenuData(
            menu.map((item) =>
              item.id === menuData.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          )
        );
      } else {
        dispatch(setMenuData([...menu, { ...menuData, quantity }]));
      }
      showModal(false);
    } else {
      setCurrentStore(menuData);
      dispatch(setMenuData([{ ...menuData, quantity }]));
      dispatch(addMenu());
      showModal(true);
    }
  };

  const handleCancel = () => {
    showModal(false);
  };

  const handleConfirm = () => {
    showModal(false);
    dispatch(deleteMenu());
    dispatch(setMenuData([]))
    handleAddCart();
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
              {menuData.minimumOrderPrice
                ? menuData.minimumOrderPrice.toLocaleString('ko-KR') + '원'
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
          content1={modalText1}
          content2={modalText2}
          twoBtn
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default CartAddBtn;
