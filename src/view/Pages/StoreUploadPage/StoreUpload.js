import React, { useEffect, useState } from 'react';
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
  const [minDeliverTime, setMinDeliverTime] = useState(0);
  const [maxDeliverTime, setMaxDeliverTime] = useState(0);
  const [minPickUpTime, setMinPickUpTime] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [operating, setOperating] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [mainCategory, setMainCategory] = useState({
    id: 0,
    name: '카테고리 선택',
  });
  const [image, setImage] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);

  const categoryList = [
    { id: 1, name: '한식' },
    { id: 2, name: '중식' },
    { id: 3, name: '일식' },
    { id: 4, name: '양식' },
    { id: 5, name: '분식' },
    { id: 6, name: '디저트' },
  ];

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
      const formData = new FormData();
      formData.append('image', image);

      await axiosInstance.patch('/restaurant/3', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await axiosInstance.patch('/restaurant/3', {
        name: name,
        address: address,
        phone_number: phone,
        description: description,
        minimumOrderPrice: minOrderPrice,
        minimumPickupPrice: minPickUpPrice,
        minDeliveryTimeMinutes: minDeliverTime,
        maxDeliveryTimeMinutes: maxDeliverTime,
        minPickupTime: minPickUpTime,
        packaging: packaging,
        status: status,
        start: start,
        end: end,
        operatingTime: operating,
        deliveryFee: deliveryFee,
        mainCategory: mainCategory.id,
        mainCategory_name: mainCategory.name,
      });
    } catch (error) {
      alert('에러가 발생했습니다', error);
    }
  };

  const handleDeleteStore = () => {
    axiosInstance.delete('/restaurant/3');
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/restaurant/3');
      setName(res.data.name);
      setAddress(res.data.address);
      setPhone(res.data.phone_number);
      setDescription(res.data.description);
      setMinOrderPrice(res.data.minimumOrderPrice);
      setMinPickUpPrice(res.data.minimumPickupPrice);
      setMinDeliverTime(res.data.minDeliveryTimeMinutes);
      setMaxDeliverTime(res.data.maxDeliveryTimeMinutes);
      setMinPickUpTime(res.data.minPickUpTime);
      setPackaging(res.data.packaging);
      setStatus(res.data.status);
      setStart(res.data.start);
      setEnd(res.data.end);
      setOperating(res.data.operatingTime);
      setDeliveryFee(res.data.deliveryFee);
      setMainCategory({
        id: res.data.mainCategory,
        name: res.data.mainCategory_name,
      });
      setImageDisplay(res.data.image);
    };
    fetchData();
  }, []);

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
              {mainCategory.name}
              <span className='storeUpload-dropdownIcon'>
                <IoMdArrowDropdown />
              </span>
            </button>
            {isOpen && (
              <ul className='storeUpload-dropdownMenu'>
                {categoryList.map((cat) => {
                  return (
                    <button key={cat.id} onClick={() => handleItemClick(cat)}>
                      <li>{cat.name}</li>
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
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 매장 번호 */}
          <div className='storeUpload-number'>
            <h1 className='storeUpload-title'>매장 전화번호</h1>
            <input
              className='storeUpload-phoneNumber'
              type='number'
              placeholder={phone ? phone : '숫자만 입력해주세요'}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* 매장 설명 */}
          <div className='storeUpload-description'>
            <h1 className='storeUpload-title'>매장 설명</h1>
            <textarea
              className='storeUpload-storeDescription'
              type='text'
              placeholder={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* 배달 최소 주문 금액 */}
          <div className='storeUpload-deliverPrice'>
            <h1 className='storeUpload-title'>배달 최소 주문 금액</h1>
            <input
              className='storeUpload-deliverMinPrice'
              type='number'
              placeholder={
                minOrderPrice ? minOrderPrice : '숫자만 입력해주세요'
              }
              onChange={(e) => setMinOrderPrice(e.target.value)}
            />
          </div>
          {/* 픽업 최소 주문 금액 */}
          <div className='storeUpload-pickupPrice'>
            <h1 className='storeUpload-title'>픽업 최소 주문 금액</h1>
            <input
              className='storeUpload-pickupMinPrice'
              type='number'
              placeholder={
                minPickUpPrice ? minPickUpPrice : '숫자만 입력해주세요'
              }
              onChange={(e) => setMinPickUpPrice(e.target.value)}
            />
          </div>
          {/* 배달 시간 */}
          <div className='storeUpload-deliverTime'>
            <h1 className='storeUpload-title'>배달 최소 시간</h1>
            <input
              className='storeUpload-deliverTime'
              type='number'
              placeholder={
                minDeliverTime ? minDeliverTime : '숫자만 입력해주세요'
              }
              onChange={(e) => setMinDeliverTime(e.target.value)}
            />
            <h1 className='storeUpload-title'>배달 최대 시간</h1>
            <input
              className='storeUpload-deliverTime'
              type='number'
              placeholder={
                maxDeliverTime ? maxDeliverTime : '숫자만 입력해주세요'
              }
              onChange={(e) => setMaxDeliverTime(e.target.value)}
            />
          </div>
          {/* 최소 픽업 시간 */}
          <div className='storeUpload-pickupTime'>
            <h1 className='storeUpload-title'>픽업 최소 시간</h1>

            <input
              className='storeUpload-pickupMinTime'
              type='number'
              placeholder={
                minPickUpTime ? minPickUpTime : '숫자만 입력해주세요'
              }
              onChange={(e) => setMinPickUpTime(e.target.value)}
            />
          </div>
          {/* 매장 영업 시작 시간 */}
          <div className='storeUpload-start'>
            <h1 className='storeUpload-title'>영업 시작 시간</h1>
            <input
              className='storeUpload-startTime'
              type='number'
              placeholder={start ? start : '0~24 사이의 숫자만 입력해주세요'}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          {/* 매장 영업 마감 시간 */}
          <div className='storeUpload-end'>
            <h1 className='storeUpload-title'>영업 마감 시간</h1>
            <input
              className='storeUpload-endTime'
              type='number'
              placeholder={end ? end : '0~24 사이의 숫자만 입력해주세요'}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          {/* 매장 영업 시간 설명 */}
          <div className='storeUpload-timeInfo'>
            <h1 className='storeUpload-title'>영업 시간 설명</h1>

            <textarea
              className='storeUpload-timeInformation'
              type='text'
              placeholder={operating}
              onChange={(e) => setOperating(e.target.value)}
            />
          </div>
          {/* 매장 배달 요금 */}
          <div className='storeUpload-operating'>
            <h1 className='storeUpload-title'>배달 요금</h1>
            <input
              className='storeUpload-operatingTime'
              type='number'
              placeholder={deliveryFee ? deliveryFee : '숫자만 입력해주세요'}
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
            저장하기
          </button>
        </div>
        <div className='storeUpload-deleteBtn'>
          <button
            className='storeUpload-storeDeleteBtn'
            onClick={handleDeleteStore}
          >
            매장 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default StoreUpload;
