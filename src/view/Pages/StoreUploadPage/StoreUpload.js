import React, { useState } from 'react'
import './StoreUpload.scss'
import { IoMdArrowDropdown } from "react-icons/io";

function StoreUpload() {

const [isOpen, setIsOpen] = useState(false); // 목록 열림 여부 상태

// 목록 열기/닫기 토글 함수
const toggleDropdown = () => {
    setIsOpen(!isOpen);
};

// 목록 항목 선택 시 처리 함수
const handleItemClick = (item) => {
    console.log('Selected item:', item);
    // 여기에 선택된 항목에 대한 처리 로직 추가
    setIsOpen(false); // 목록 닫기
};


  return (
    <div className='StoreUpload'>
      <div className='storeUpload-header'>
        <h1 className='storeUpload-pageTitle'>매장 등록</h1>
        <div className='storeUpload-fieldFrame'>
            {/* 매장 이름 */}
            <div className='storeUpload-name'>
                <input className='storeUpload-storeName' type="text" placeholder='매장 이름'/>
            </div>
            {/* 매장 주소 */}
            <div className='storeUpload-address'>
                <h1 className='storeUpload-addressName'>
                    <button className='storeUpload-addressBtn'>주소 추가</button>
                </h1>
            </div>
            {/* 매장 번호 */}
            <div className='storeUpload-number'>
                <input className='storeUpload-phoneNumber'  type="text" placeholder='매장 전화번호'/>
            </div>
            {/* 매장 설명 */}
            <div className='storeUpload-description'>
                <input className='storeUpload-storeDescription' type="text" placeholder='매장 설명'/>
            </div>
            {/* 매장 최소 주문 금액 */}
            <div className='storeUpload-deliverPrice'>
                <input className='storeUpload-deliverMinPrice' type="text" placeholder='최소 주문 금액'/>
            </div>
            {/* 픽업 최소 주문 금액 */}
            <div className='storeUpload-pickupPrice'>
                <input className='storeUpload-pickupMinPrice' type="text" placeholder='픽업 최소 주문 금액'/>
            </div>                
            {/* 매장 최소 픽업 시간 */}
            <div className='storeUpload-pickupTime'>
                <input className='storeUpload-pickupMinTime' type="text" placeholder='최소 픽업 금액'/>
            </div>                         
            {/* 매장 영업 시작 시간 */}
            <div className='storeUpload-start'>
                <input className='storeUpload-startTime' type="text" placeholder='영업 시작 시간'/>
            </div>       
            {/* 매장 영업 마감 시간 */}
            <div className='storeUpload-end'>
                <input className='storeUpload-endTime' type="text" placeholder='영업 마감 시간'/>
            </div>                   
            {/* 매장 영업 시간 설명 */}
            <div className='storeUpload-timeInfo'>
                <input className='storeUpload-timeInformation' type="text" placeholder='영업 시간 설명'/>
            </div>      
            {/* 매장 배달 요금 */}
            <div className='storeUpload-operating'>
                <input className='storeUpload-operatingTime' type="text" placeholder='배달 요금'/>
            </div>    
            {/* 매장 대분류 */}
            <div className='storeUpload-categoryDropdown' onClick={toggleDropdown}>
                <div className='storeUpload-mainCategory'>
                    매장 메인 카테고리
                    <span className='storeUpload-dropdownIcon'><IoMdArrowDropdown/></span>
                </div>  
                {isOpen && (
                <ul className="storeUpload-dropdownMenu">
                    {/* <li>aa</li> */}
                    {/* <li>aaaa</li> */}
                    <li onClick={() => handleItemClick('항목 1')}>항목 1</li>
                    <li onClick={() => handleItemClick('항목 2')}>항목 2</li>
                    <li onClick={() => handleItemClick('항목 3')}>항목 3</li>
                {/* 필요한 만큼 목록 항목을 추가 */}
                </ul>
                )}    
            </div>          
            {/* 매장 중분류 */}
            <div className='storeUpload-subTitle'>
                <input className='storeUpload-subCategory' type="text" placeholder='매장 세부 카테고리'/>
            </div>   
            {/* 여부 체크 리스트 */}
            <div className='storeUpload-checkedList'>
                {/* 포장 여부 */}
                <div className='storeUpload-packaging'>
                    <h1 className='storeUpload-packagingCheck'>포장 가능 여부</h1>
                    <input className='storeUpload-packagingChecked' type="checkbox"/>
                </div>    
                {/* 매장 운영 여부 */}
                <div className='storeUpload-status'>
                    <h1 className='storeUpload-statusCheck'>매장 운영 여부</h1>
                    <input className='storeUpload-statusChecked' type="checkbox"/>
                </div>    
            </div>                                                      
        </div>
        <div className='storeUpload-uploadBtn'>
            <button className='storeUpload-storeUploadBtn'> 매장 등록하기</button>
        </div>
      </div>
    </div>
  )
}

export default StoreUpload
