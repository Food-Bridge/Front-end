import React, { useState } from 'react'
import './OptionUpload.scss'

function OptionUpload() {
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');

  return (
    <div className='OptionUpload'>
      <div className='optionUpload-header'>
        <h1 className='optionUpload-optionTitle'>옵션 등록</h1>

        <div className='optionUpload-fieldFrame'>
            {/* 옵션 이름 */}
            <div className='optionUpload-name'>
                <h1 className='optionUpload-title'>옵션 이름</h1>
                <input
                className='optionUpload-optionName'
                type='text'
                placeholder={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>

            {/* 옵션 금액 */}
            <div className='optionUpload-optionPrice'>
            <h1 className='optionUpload-price'>옵션 금액</h1>
            <input
                className='optionUpload-priceInput'
                type='number'
                placeholder={
                price ? price : '숫자만 입력해주세요'
                }
                onChange={(e) => setPrice(e.target.value)}
            />
            </div>    
        </div>

        {/* 옵션 등록 버튼 */}
        <div className='optionUpload-uploadBtn'>
            <button
            className='optionUpload-optionUploadBtn'
            // onClick={handleAddOption}
            >
            옵션 저장하기
            </button>
        </div>

      </div>
    </div>
  )
}

export default OptionUpload
