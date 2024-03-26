import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import './MenuUpload.scss'

function MenuUpload() {

    const [isOpen, setIsOpen] = useState(false);
    const [storeName, setStoreName] = useState({
        id: 0,
        name: '매장 선택',
      });
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [menuImage, setMenuImage] = useState(null);
    const [menuImageDisplay, setMenuImageDisplay] = useState(null);

    const storeList = [
        { id: 1, name: '매장 1' },
        { id: 2, name: '매장 2' },
        { id: 3, name: '매장 3' },
      ];

      const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const handleStoreClick = (item) => {
        setStoreName(item);
        setIsOpen(false);
      };

      const handleSetMenuImage = (event) => {
        const file = event.target.files[0];
        setMenuImage(file);
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setMenuImageDisplay(reader.result);
        };
        reader.readAsDataURL(file);
      };

    return (
        <div className='MenuUpload'>
            <div className='menuUpload-header'>
            <h1 className='menuUpload-pageTitle'>메뉴 등록</h1>

            <div className='menuUpload-fieldFrame'>
                {/* 매장 리스트 */}
                <div
                className='menuUpload-storeDropdown'
                onClick={toggleDropdown}
                >
                <button className='menuUpload-storeList'>
                    {storeName.name}
                    <span className='menuUpload-dropdownIcon'>
                        <IoMdArrowDropdown />
                    </span>
                </button>
                {isOpen && (
                    <ul className='menuUpload-dropdownStore'>
                    {storeList.map((store) => {
                        return (
                        <button key={store.id} onClick={() => handleStoreClick(store)}>
                            <li>{store.name}</li>
                        </button>
                        );
                    })}
                    </ul>
                )}
                </div>

                {/* 메뉴 이름 */}
                <div className='menuUpload-name'>
                    <h1 className='menuUpload-title'>메뉴 이름</h1>
                    <input
                    className='menuUpload-menuName'
                    type='text'
                    placeholder={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* 메뉴 금액 */}
                <div className='menuUpload-menuPrice'>
                <h1 className='menuUpload-menuTitle'>메뉴 금액</h1>
                <input
                    className='menuUpload-priceInput'
                    type='number'
                    placeholder={
                    price ? price : '숫자만 입력해주세요'
                    }
                    onChange={(e) => setPrice(e.target.value)}
                />
                </div>                

                {/* 메뉴 설명 */}
                <div className='menuUpload-description'>
                <h1 className='menuUpload-title'>메뉴 설명</h1>
                <textarea
                    className='menuUpload-storeDescription'
                    type='text'
                    placeholder={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>

                {/* 메뉴 이미지 */}
                <div className='menuUpload-image'>
                <h1 className='menuUpload-title'>매장 이미지 등록</h1>
                <img className='menuUpload-imageDisplay' src={menuImageDisplay} />
                <input
                    className='menuUpload-imageInput'
                    type='file'
                    onChange={handleSetMenuImage}
                />
                </div>
            </div>
            <div className='storeUpload-uploadBtn'>
                <button
                className='storeUpload-storeUploadBtn'
                // onClick={handleAddMenu}
                >
                메뉴 저장하기
                </button>
            </div>
            <div className='storeUpload-deleteBtn'>
                <button
                className='storeUpload-storeDeleteBtn'
                // onClick={handleDeleteMenu}
                >
                메뉴 삭제하기
                </button>
            </div>
            </div>
        </div>
        );
}

export default MenuUpload
