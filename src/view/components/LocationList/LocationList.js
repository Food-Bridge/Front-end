import React, { useEffect } from 'react';
import './LocationList.scss';
import {MdLocationOn} from '@react-icons/all-files/md/MdLocationOn'
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAddresses,
  selectAddresses,
  setDefaultAddress,
  deleteAddress,
  selectDefaultId,
} from '../../../redux/reducers/addressSlice';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice';

const LocationList = ({
  isEdit,
  editedNicknames,
  handleEditAddressNickname,
  setLoading
}) => {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const defaultId = useSelector(selectDefaultId);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchAddresses());
      setLoading(false);
    }
  }, [dispatch, isLoggedIn, setLoading]);

  const handleDefaultAddress = (address) => {
    dispatch(setDefaultAddress(address));
  };

  return (
    <div className='location-list'>
      {addresses.map((address) => (
        <div className='location-button' key={address.id}>
          <button onClick={() => handleDefaultAddress(address)}>
            <MdLocationOn
              className='location-icon'
              style={{ color: address.id === defaultId ? 'red' : 'black' }}
            />
          </button>

          <div className='location-content'>
            {isEdit ? (
              <input
                className='location-input'
                placeholder={address.nickname}
                value={editedNicknames[address.id] || address.nickname}
                onChange={(e) =>
                  handleEditAddressNickname(address.id, e.target.value)
                }
              />
            ) : (
              <h1 className='location-name'>{address.nickname}</h1>
            )}
            <p className='location-address'>{address.detail_address}</p>
          </div>
          {isEdit && (
            <button
              className='location-editBtn'
              onClick={() => dispatch(deleteAddress(address.id))}
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
