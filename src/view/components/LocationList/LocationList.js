import React, { useEffect } from 'react';
import './LocationList.scss';
import { CiLocationOn } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAddresses,
  selectAddresses,
  setDefaultAddress,
  deleteAddress,
} from '../../../redux/reducers/addressSlice';

const LocationList = ({ isEdit, editedNicknames, handleEditAddressNickname }) => {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  return (
    <div className='location-list'>
      {addresses.map(({ nickname, detail_address, is_default, id }) => (
        <div className='location-button' key={id}>
          <button onClick={() => dispatch(setDefaultAddress(id))}>
            <CiLocationOn
              className='location-icon'
              style={{ color: is_default ? 'red' : 'black' }}
            />
          </button>

          <div className='location-content'>
            {isEdit ? (
              <>
                <input
                  className='location-input'
                  placeholder={nickname}
                  value={editedNicknames[id] || nickname}
                  onChange={(e) => handleEditAddressNickname(id, e.target.value)}
                />
              </>
            ) : (
              <h1 className='location-name'>{nickname}</h1>
            )}
            <p className='location-address'>{detail_address}</p>
          </div>
          {isEdit && (
            <button
              className='location-editBtn'
              onClick={() => dispatch(deleteAddress(id))}
            >
              삭제
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default LocationList;
