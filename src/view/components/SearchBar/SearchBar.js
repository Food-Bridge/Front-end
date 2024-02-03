import React, { useState } from 'react';
import './SearchBar.scss';
import { CiLocationOn, CiHeart, CiShoppingBasket } from 'react-icons/ci';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function SearchBar({ count }) {
  const navigate = useNavigate();
  const locations = [
    '서울시 강남구 역삼로 111',
    '서울시 강남구 역삼로 222',
    '서울시 관악구 봉천로 333',
  ];

  const [location, setLocation] = useState(locations[0]);

  const [showList, setShowList] = useState(false);

  const handleShowList = () => {
    setShowList(!showList);
  };

  const handleSearchClick = () => {
    navigate('/search/');
  };

  const handleControlClick = () => {
    navigate(`address/`);
  };

  return (
    <div className='SearchBar'>
      <header className='searchBar-frame'>
        <div className='searchBar-margin'>
          <button className='searchBar-location' onClick={handleShowList}>
            <CiLocationOn className='searchBar-locaIcon' />
            <h1 className='searchBar-locaName'>
              {location.split(' ').slice(1, 2).join(' ')}
            </h1>
            <RiArrowDropDownFill className='searchBar-arrowIcon' />
          </button>
          <div className='searchBar-input'>
            <button className='searchBar-inputBox' onClick={handleSearchClick}>
              <IoIosSearch className='searchBar-searchIcon' />
            </button>
          </div>
          <div className='searchBar-etcIcon'>
            <CiHeart className='searchBar-heartIcon' />
            <div className='searchBar-shopCount'>
              <CiShoppingBasket className='searchBar-shopIcon'>
                <div className='searchBar-countBlock'>
                  <h1 className='searchBar-countText'>{count}</h1>
                </div>
              </CiShoppingBasket>
            </div>
          </div>
        </div>
        {showList && (
          <div className='searchBar-locaList'>
            {locations.map((address, index) => (
              <button
                key={index}
                className={`searchBar-loca ${
                  location === address ? 'selected' : ''
                }`}
                onClick={() => setLocation(address)}
              >
                {locations[index]}
              </button>
            ))}
            <button
              className='searchBar-loca control'
              onClick={handleControlClick}
            >
              + 주소 관리
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default SearchBar;
