import React, { useState } from 'react';
import './StoreUpload.scss';
import { IoMdArrowDropdown } from 'react-icons/io';
import DaumPostCode from 'react-daum-postcode';

function StoreUpload() {
  const [isOpen, setIsOpen] = useState(false);
  const [addAddress, setAddAddress] = useState(false);

  const [packaging, setPackaging] = useState(false);
  const [status, setStatus] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [minOrderPrice, setMinOrderPrice] = useState(0);
  const [minPickUpPrice, setMinPickUpPrice] = useState(0);
  const [minPickUpTime, setMinPickUpTime] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [operating, setOperating] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [mainCategory, setMainCategory] = useState('매장 메인 카테고리');

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

  return (
    <div className='StoreUpload'>
      {addAddress ? (
        <div className='storeUpload-addAddress'>
          <DaumPostCode onComplete={handleComplete} className='post-code' />;
        </div>
      ) : (
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
            {/* 매장 이름 */}
            <div className='storeUpload-name'>
              <input
                className='storeUpload-storeName'
                type='text'
                placeholder='매장 이름'
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* 매장 번호 */}
            <div className='storeUpload-number'>
              <input
                className='storeUpload-phoneNumber'
                type='text'
                placeholder='매장 전화번호'
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* 매장 설명 */}
            <div className='storeUpload-description'>
              <input
                className='storeUpload-storeDescription'
                type='text'
                placeholder='매장 설명'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* 매장 최소 주문 금액 */}
            <div className='storeUpload-deliverPrice'>
              <input
                className='storeUpload-deliverMinPrice'
                type='text'
                placeholder='최소 주문 금액'
                onChange={(e) => setMinOrderPrice(e.target.value)}
              />
            </div>
            {/* 픽업 최소 주문 금액 */}
            <div className='storeUpload-pickupPrice'>
              <input
                className='storeUpload-pickupMinPrice'
                type='text'
                placeholder='픽업 최소 주문 금액'
                onChange={(e) => setMinPickUpPrice(e.target.value)}
              />
            </div>
            {/* 매장 최소 픽업 시간 */}
            <div className='storeUpload-pickupTime'>
              <input
                className='storeUpload-pickupMinTime'
                type='text'
                placeholder='최소 픽업 금액'
                onChange={(e) => setMinPickUpTime(e.target.value)}
              />
            </div>
            {/* 매장 영업 시작 시간 */}
            <div className='storeUpload-start'>
              <input
                className='storeUpload-startTime'
                type='text'
                placeholder='영업 시작 시간(0~24시)'
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            {/* 매장 영업 마감 시간 */}
            <div className='storeUpload-end'>
              <input
                className='storeUpload-endTime'
                type='text'
                placeholder='영업 마감 시간(0~24시)'
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
            {/* 매장 영업 시간 설명 */}
            <div className='storeUpload-timeInfo'>
              <input
                className='storeUpload-timeInformation'
                type='text'
                placeholder='영업 시간 설명'
                onChange={(e) => setOperating(e.target.value)}
              />
            </div>
            {/* 매장 배달 요금 */}
            <div className='storeUpload-operating'>
              <input
                className='storeUpload-operatingTime'
                type='text'
                placeholder='배달 요금'
                onChange={(e) => setDeliveryFee(e.target.value)}
              />
            </div>
            {/* 매장 대분류 */}
            <div
              className='storeUpload-categoryDropdown'
              onClick={toggleDropdown}
            >
              <div className='storeUpload-mainCategory'>
                {mainCategory}
                <span className='storeUpload-dropdownIcon'>
                  <IoMdArrowDropdown />
                </span>
              </div>
              {isOpen && (
                <ul className='storeUpload-dropdownMenu'>
                  {categoryList.map(({ name }) => {
                    return (
                      <button onClick={() => handleItemClick(name)}>
                        <li>{name}</li>
                      </button>
                    );
                  })}
                </ul>
              )}
            </div>
            {/* 매장 주소 */}
            <div className='storeUpload-address'>
              <h1 className='storeUpload-addressName'>
                <button
                  className='storeUpload-addressBtn'
                  onClick={() => {
                    setAddAddress(true);
                  }}
                >
                  주소 추가
                </button>
              </h1>
            </div>
          </div>
          <div className='storeUpload-uploadBtn'>
            <button className='storeUpload-storeUploadBtn'>
              {' '}
              매장 등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreUpload;
