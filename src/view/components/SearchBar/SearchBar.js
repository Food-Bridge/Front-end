import React, { useState, useEffect } from 'react';
import './SearchBar.scss';
import { CiLocationOn, CiHeart } from 'react-icons/ci';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Basket from '../Basket/Basket';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAddresses,
  selectAddresses,
  selectDefaultId,
  setDefaultId,
  setDefaultAddress,
} from '../../../redux/reducers/addressSlice';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice';

function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);
  const defaultId = useSelector(selectDefaultId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showList, setShowList] = useState(false);
  console.log(defaultId);
  console.log(addresses);

  useEffect(() => {
    if (isLoggedIn && addresses.length === 0) {
      dispatch(fetchAddresses());
    }
  }, [dispatch, isLoggedIn, addresses]);

  const handleToggleLocationList = () => {
    setShowList(!showList);
  };

  const handleClickAddress = (address) => {
    dispatch(setDefaultAddress(address));
    dispatch(setDefaultId(address.id));
  };

  const handleSearchClick = () => {
    navigate('/search/');
  };

  const handleControlClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다');
      navigate('/users/signin');
    } else {
      navigate(`/users/address/`);
    }
  };

  const handleClickLikes = () => {
    navigate('/likes/');
  };

  return (
    <div className='SearchBar'>
      <header className='searchBar-frame'>
        <div className='searchBar-margin'>
          <button
            className='searchBar-location'
            onClick={handleToggleLocationList}
          >
            <CiLocationOn className='searchBar-locaIcon' />
            <h1 className='searchBar-locaName'>
              {isLoggedIn
                ? defaultId
                  ? addresses
                      .find((address) => address.id === defaultId)
                      .sigungu.split(' ')[0]
                  : '로딩중'
                : '로그인 필요'}
            </h1>
            <RiArrowDropDownFill className='searchBar-arrowIcon' />
          </button>
          <div className='searchBar-input'>
            <button className='searchBar-inputBox' onClick={handleSearchClick}>
              <IoIosSearch className='searchBar-searchIcon' />
            </button>
          </div>
          <div className='searchBar-etcIcon'>
            <button onClick={handleClickLikes}>
              <CiHeart className='searchBar-heartIcon' />
            </button>
            <Basket count='1' />
          </div>
        </div>
        {showList && (
          <div className='searchBar-locaList'>
            {addresses.map((address) => (
              <button
                key={address.id}
                className={`searchBar-loca ${
                  defaultId === address.id ? 'selected' : ''
                }`}
                onClick={() => handleClickAddress(address)}
              >
                {address.detail_address}
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
