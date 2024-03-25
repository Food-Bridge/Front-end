import React, { useState } from 'react';
import './StoreUpload.scss';
import { IoMdArrowDropdown, IoIosSearch } from 'react-icons/io';
import { HiMiniXMark } from 'react-icons/hi2';
import axiosInstance from '../../../api/instance';

import DaumPostCode from 'react-daum-postcode';

function StoreUpload() {
  const [isOpen, setIsOpen] = useState(false);
  const [addAddress, setAddAddress] = useState(false);

  const [packaging, setPackaging] = useState(false);
  const [status, setStatus] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('매장 주소 추가');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [minOrderPrice, setMinOrderPrice] = useState(0);
  const [minPickUpPrice, setMinPickUpPrice] = useState(0);
  const [minPickUpTime, setMinPickUpTime] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [operating, setOperating] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [mainCategory, setMainCategory] = useState('카테고리 선택');
  const [image, setImage] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);

  const categoryList = ['한식', '중식', '일식', '양식', '분식', '디저트'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setMainCategory(item);
    setIsOpen(false);
  };

  const handleComplete = (data) => {
    setAddAddress(false);
    const { roadAddress, buildingName } = data;
    setAddress(`${roadAddress} ${buildingName && buildingName}`);
  };

  const handleSetImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageDisplay(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddStore = async () => {
    try {
      const res = await axiosInstance.post('/restaurant/', {
        name: name,
        address: address,
        phone_number: phone,
        description: description,
        minimumOrderPrice: minOrderPrice,
        minimumPickupPrice: minPickUpPrice,
        minPickupTime: minPickUpTime,
        packaging: packaging,
        status: status,
        start: start,
        end: end,
        operatingTime: operating,
        deliveryFee: deliveryFee,
        mainCategory: mainCategory,
      });
      console.log(res);
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };

  return (
    <div className='StoreUpload'>
      {addAddress && (
        <div className='storeUpload-addAddress'>
          <header className='storeUpload-addAddress-header'>
            <button onClick={() => setAddAddress(false)}>
              <HiMiniXMark size='30' />
            </button>
          </header>
          <DaumPostCode onComplete={handleComplete} className='post-code' />
        </div>
      )}
      <div className='storeUpload-header'>
        <h1 className='storeUpload-pageTitle'>매장 등록</h1>

        <div className='storeUpload-fieldFrame'>
          {/* 여부 체크 리스트 */}
          <div className='storeUpload-checkedList'>
            {/* 포장 여부 */}
            <div className='storeUpload-packaging'>
              <h1 className='storeUpload-packagingCheck'>포장 가능 여부</h1>
              <input
                className='storeUpload-packagingChecked'
                type='checkbox'
                checked={packaging}
                onChange={() => {
                  setPackaging(!packaging);
                }}
              />
            </div>
            {/* 매장 운영 여부 */}
            <div className='storeUpload-status'>
              <h1 className='storeUpload-statusCheck'>매장 운영 여부</h1>
              <input
                className='storeUpload-statusChecked'
                type='checkbox'
                checked={status}
                onChange={() => {
                  setStatus(!status);
                }}
              />
            </div>
          </div>
          {/* 매장 대분류 */}
          <div
            className='storeUpload-categoryDropdown'
            onClick={toggleDropdown}
          >
            <button className='storeUpload-mainCategory'>
              {mainCategory}
              <span className='storeUpload-dropdownIcon'>
                <IoMdArrowDropdown />
              </span>
            </button>
            {isOpen && (
              <ul className='storeUpload-dropdownMenu'>
                {categoryList.map((cat) => {
                  return (
                    <button onClick={() => handleItemClick(cat)}>
                      <li>{cat}</li>
                    </button>
                  );
                })}
              </ul>
            )}
          </div>
          {/* 매장 주소 */}
          <div className='storeUpload-address'>
            <p className='storeUpload-addressName'>{address}</p>
            <button
              className='storeUpload-addressBtn'
              onClick={() => {
                setAddAddress(!addAddress);
              }}
            >
              <IoIosSearch size='24' />
            </button>
          </div>
          {/* 매장 이름 */}
          <div className='storeUpload-name'>
            <h1 className='storeUpload-title'>매장 이름</h1>
            <input
              className='storeUpload-storeName'
              type='text'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 매장 번호 */}
          <div className='storeUpload-number'>
            <h1 className='storeUpload-title'>매장 전화번호</h1>
            <input
              className='storeUpload-phoneNumber'
              type='text'
              placeholder='숫자만 입력해주세요'
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* 매장 설명 */}
          <div className='storeUpload-description'>
            <h1 className='storeUpload-title'>매장 설명</h1>
            <textarea
              className='storeUpload-storeDescription'
              type='text'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* 매장 최소 주문 금액 */}
          <div className='storeUpload-deliverPrice'>
            <h1 className='storeUpload-title'>최소 주문 금액</h1>
            <input
              className='storeUpload-deliverMinPrice'
              type='text'
              placeholder='숫자만 입력해주세요'
              onChange={(e) => setMinOrderPrice(e.target.value)}
            />
          </div>
          {/* 픽업 최소 주문 금액 */}
          <div className='storeUpload-pickupPrice'>
            <h1 className='storeUpload-title'>픽업 최소 주문 금액</h1>
            <input
              className='storeUpload-pickupMinPrice'
              type='text'
              placeholder='숫자만 입력해주세요'
              onChange={(e) => setMinPickUpPrice(e.target.value)}
            />
          </div>
          {/* 매장 최소 픽업 시간 */}
          <div className='storeUpload-pickupTime'>
            <h1 className='storeUpload-title'>매장 픽업 최소 시간</h1>

            <input
              className='storeUpload-pickupMinTime'
              type='text'
              placeholder='숫자만 입력해주세요'
              onChange={(e) => setMinPickUpTime(e.target.value)}
            />
          </div>
          {/* 매장 영업 시작 시간 */}
          <div className='storeUpload-start'>
            <h1 className='storeUpload-title'>영업 시작 시간</h1>
            <input
              className='storeUpload-startTime'
              type='text'
              placeholder='0~24 사이의 숫자만 입력해주세요'
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          {/* 매장 영업 마감 시간 */}
          <div className='storeUpload-end'>
            <h1 className='storeUpload-title'>영업 마감 시간</h1>
            <input
              className='storeUpload-endTime'
              type='text'
              placeholder='0~24 사이의 숫자만 입력해주세요'
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          {/* 매장 영업 시간 설명 */}
          <div className='storeUpload-timeInfo'>
            <h1 className='storeUpload-title'>영업 시간 설명</h1>

            <textarea
              className='storeUpload-timeInformation'
              type='text'
              onChange={(e) => setOperating(e.target.value)}
            />
          </div>
          {/* 매장 배달 요금 */}
          <div className='storeUpload-operating'>
            <h1 className='storeUpload-title'>배달 요금</h1>
            <input
              className='storeUpload-operatingTime'
              type='text'
              placeholder='숫자만 입력해주세요'
              onChange={(e) => setDeliveryFee(e.target.value)}
            />
          </div>

          {/* 매장 이미지 */}
          <div className='storeUpload-image'>
            <h1 className='storeUpload-title'>매장 이미지 등록</h1>
            <img className='storeUpload-imageDisplay' src={imageDisplay} />
            <input
              className='storeUpload-imageInput'
              type='file'
              onChange={handleSetImage}
            />
          </div>
        </div>
        <div className='storeUpload-uploadBtn'>
          <button
            className='storeUpload-storeUploadBtn'
            onClick={handleAddStore}
          >
            매장 등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default StoreUpload;
