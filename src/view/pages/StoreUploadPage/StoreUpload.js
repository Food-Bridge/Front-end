import React, { useEffect, useState } from 'react';
import './StoreUpload.scss';
import { IoMdArrowDropdown } from '@react-icons/all-files/io/IoMdArrowDropdown';
import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch';

import { IoClose } from '@react-icons/all-files/io5/IoClose';
import axiosInstance from '../../../api/instance';
import Swal from 'sweetalert2';
import DaumPostCode from 'react-daum-postcode';
import { useDispatch, useSelector } from 'react-redux';
import { selectOwner, setOwner } from '../../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import BrowserImageCompression from '../../../api/compress';

function StoreUpload() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const owner = useSelector(selectOwner);
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

  const handleAddStore = async () => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      }
      formData.append('name', name);
      formData.append('address', address);
      formData.append('phone_number', phone);
      formData.append('description', description);
      formData.append('minimumOrderPrice', minOrderPrice);
      formData.append('minimumPickupPrice', minPickUpPrice);
      formData.append('minDeliveryTimeMinutes', minDeliverTime);
      formData.append('maxDeliveryTimeMinutes', maxDeliverTime);
      formData.append('minPickupTime', minPickUpTime);
      formData.append('packaging', packaging);
      formData.append('status', status);
      formData.append('start', start);
      formData.append('end', end);
      formData.append('operatingTime', operating);
      formData.append('deliveryFee', deliveryFee);
      formData.append('mainCategory', mainCategory.id);
      formData.append('mainCategory_name', mainCategory.name);

      if (typeof owner === 'number') {
        await axiosInstance.patch(`/restaurant/${owner}/`, formData);
      } else {
        const response = await axiosInstance.post(`/restaurant/`, formData);
        dispatch(setOwner(response.data.id));
      }

      Swal.fire({
        icon: 'success',
        title: owner ? '매장 수정' : '매장 추가',
        html: '요청이 정상적으로 이루어졌습니다.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: 'black',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: '알림',
        html: '입력한 데이터를 확인해주세요.',
        showCancelButton: false,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        confirmButtonColor: '#ca0000',
        cancelButtonColor: 'black',
      });
    }
  };

  const handleDeleteStore = () => {
    axiosInstance.delete(`/restaurant/${owner}`);
    dispatch(setOwner(null));
    setName('');
    setAddress('매장 주소 추가');
    setPhone('');
    setDescription('');
    setMinOrderPrice(0);
    setMinPickUpPrice(0);
    setMinDeliverTime(0);
    setMaxDeliverTime(0);
    setMinPickUpTime(0);
    setPackaging(false);
    setStatus(false);
    setStart(0);
    setEnd(0);
    setOperating('');
    setDeliveryFee(0);
    setMainCategory({
      id: 0,
      name: '카테고리 선택',
    });
    setImageDisplay(null);
  };

  const handleClickDelete = () => {
    Swal.fire({
      icon: 'warning',
      title: '매장 삭제',
      html: '매장을 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      confirmButtonColor: '#ca0000',
      cancelButtonColor: 'black',
    }).then((res) => {
      res.isConfirmed && handleDeleteStore();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/restaurant/${owner}`);
      setName(res.data.name);
      setAddress(res.data.address);
      setPhone(res.data.phone_number);
      setDescription(res.data.description);
      setMinOrderPrice(res.data.minimumOrderPrice);
      setMinPickUpPrice(res.data.minimumPickupPrice);
      setMinDeliverTime(res.data.minDeliveryTimeMinutes);
      setMaxDeliverTime(res.data.maxDeliveryTimeMinutes);
      setMinPickUpTime(res.data.minPickupTime);
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
      console.log(res);
    };
    typeof owner === 'number' && fetchData();
  }, [owner]);

  return (
    <div className='StoreUpload'>
      {addAddress && (
        <div className='storeUpload-addAddress'>
          <header className='storeUpload-addAddress-header'>
            <button onClick={() => setAddAddress(false)} aria-label='닫기'>
              <IoClose size='30' />
            </button>
          </header>
          <DaumPostCode onComplete={handleComplete} className='post-code' />
        </div>
      )}
      <div className='storeUpload-header'>
        <h1 className='storeUpload-pageTitle'>매장 등록</h1>

        <div className='storeUpload-fieldFrame'>
          <div className='storeUpload-checkedList'>
            <div className='storeUpload-packaging'>
              <h1 className='storeUpload-packagingCheck'>포장 가능 여부</h1>
              <input
                className='storeUpload-packagingChecked'
                type='checkbox'
                aria-label='포장 가능 여부'
                checked={packaging}
                onChange={() => {
                  setPackaging(!packaging);
                }}
              />
            </div>
            <div className='storeUpload-status'>
              <h1 className='storeUpload-statusCheck'>매장 운영 여부</h1>
              <input
                className='storeUpload-statusChecked'
                type='checkbox'
                aria-label='매장 운영 여부'
                checked={status}
                onChange={() => {
                  setStatus(!status);
                }}
              />
            </div>
          </div>
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
          <div className='storeUpload-address'>
            <p className='storeUpload-addressName'>{address}</p>
            <button
              className='storeUpload-addressBtn'
              aria-label='주소 검색'
              onClick={() => {
                setAddAddress(!addAddress);
              }}
            >
              <IoIosSearch size='24' />
            </button>
          </div>
          <div className='storeUpload-name'>
            <h1 className='storeUpload-title'>매장 이름</h1>
            <input
              className='storeUpload-storeName'
              type='text'
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='storeUpload-number'>
            <h1 className='storeUpload-title'>매장 전화번호</h1>
            <input
              className='storeUpload-phoneNumber'
              type='number'
              placeholder={phone ? phone : '숫자만 입력해주세요'}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='storeUpload-description'>
            <h1 className='storeUpload-title'>매장 설명</h1>
            <textarea
              className='storeUpload-storeDescription'
              type='text'
              placeholder={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
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
          <div className='storeUpload-start'>
            <h1 className='storeUpload-title'>영업 시작 시간</h1>
            <input
              className='storeUpload-startTime'
              type='number'
              placeholder={start ? start : '0~24 사이의 숫자만 입력해주세요'}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className='storeUpload-end'>
            <h1 className='storeUpload-title'>영업 마감 시간</h1>
            <input
              className='storeUpload-endTime'
              type='number'
              placeholder={end ? end : '0~24 사이의 숫자만 입력해주세요'}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <div className='storeUpload-timeInfo'>
            <h1 className='storeUpload-title'>영업 시간 설명</h1>

            <textarea
              className='storeUpload-timeInformation'
              type='text'
              placeholder={operating}
              onChange={(e) => setOperating(e.target.value)}
            />
          </div>
          <div className='storeUpload-operating'>
            <h1 className='storeUpload-title'>배달 요금</h1>
            <input
              className='storeUpload-operatingTime'
              type='number'
              placeholder={deliveryFee ? deliveryFee : '숫자만 입력해주세요'}
              onChange={(e) => setDeliveryFee(e.target.value)}
            />
          </div>
          <div className='storeUpload-image'>
            <h1 className='storeUpload-title'>매장 이미지 등록</h1>
            <img
              className='storeUpload-imageDisplay'
              src={imageDisplay}
              alt='매장 이미지'
            />
            <BrowserImageCompression
              className='storeUpload-imageInput'
              setImage={setImage}
              setImageDisplay={setImageDisplay}
              size='1.5'
              length='1000'
            />
          </div>
        </div>
        <div className='storeUpload-uploadBtn'>
          <button
            className='storeUpload-storeUploadBtn'
            onClick={handleAddStore}
          >
            {typeof owner === 'number' ? '수정하기' : '저장하기'}
          </button>
        </div>
        <div className='storeUpload-deleteBtn'>
          {owner && (
            <button
              className='storeUpload-storeDeleteBtn'
              onClick={handleClickDelete}
            >
              매장 삭제하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default StoreUpload;
