import React, { useState, useEffect } from 'react';
import './SearchBar.scss';
import {MdLocationOn} from '@react-icons/all-files/md/MdLocationOn'
import { IoIosHeartEmpty} from '@react-icons/all-files/io/IoIosHeartEmpty'
import { RiArrowDropDownFill } from '@react-icons/all-files/ri/RiArrowDropDownFill';
import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch';
import { useNavigate } from 'react-router-dom';
import Basket from '../Basket/Basket';
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAddresses,
  selectAddresses,
  selectDefaultId,
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

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchAddresses());
    }
  }, [dispatch, isLoggedIn]);

  const handleToggleLocationList = () => {
    setShowList(!showList);
  };

  const handleClickAddress = (address) => {
    dispatch(setDefaultAddress(address));
  };

  const handleSearchClick = () => {
    navigate('/search/');
  };

  const handleControlClick = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        text: '알림',
        text: '로그인이 필요합니다.',
        showCancelButton: false,
        confirmButtonText: '로그인하기',
        confirmButtonColor: 'black',
      }).then((res) => res.isConfirmed && navigate('/users/signin'));
    } else {
      navigate(`/users/address/`);
    }
  };

  const handleClickLikes = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        text: '알림',
        text: '로그인이 필요합니다.',
        showCancelButton: false,
        confirmButtonText: '로그인하기',
        confirmButtonColor: 'black',
      }).then((res) => res.isConfirmed && navigate('/users/signin'));
    } else {
      navigate('/users/likes/');
    }
  };

  return (
    <div className='SearchBar'>
      <header className='searchBar-frame'>
        <div className='searchBar-margin'>
          <button
            className='searchBar-location'
            onClick={handleToggleLocationList}
          >
            <MdLocationOn className='searchBar-locaIcon' />
            <h1 className='searchBar-locaName'>
              {isLoggedIn
                ? defaultId && addresses.length > 0
                  ? addresses
                      .find((address) => address.id === defaultId)
                      ?.sigungu.split(' ')[0] ||
                    addresses
                      .find((address) => address.id === defaultId)
                      ?.detail_address.split(' ')[1]
                  : '주소 선택'
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
              <IoIosHeartEmpty className='searchBar-heartIcon' />
            </button>
            <Basket />
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
