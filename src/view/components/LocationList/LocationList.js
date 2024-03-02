import React, { useEffect } from 'react';
import './LocationList.scss';
import { CiLocationOn } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateAddresses,
  selectAddresses,
} from '../../../redux/reducers/addressSlice';
import axiosInstance from '../../../api/instance';

const LocationList = ({
  isEdit,
  handleSetDefault,
  handleEditNickname,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);

  useEffect(() => {
    const fetchAddresses = async () => {
      const updatedRes = await axiosInstance.get('/users/address/');
      dispatch(updateAddresses(updatedRes.data));
      console.log('Locations updated:', updatedRes.data);
    };
    fetchAddresses();
  }, [dispatch]);

  return (
    <div className='location-list'>
      {addresses.map(({ nickname, detail_address, is_default, id }) => (
        <div className='location-button' key={id}>
          <button onClick={() => handleSetDefault(id)}>
            <CiLocationOn
              className='location-icon'
              style={{ color: is_default ? 'red' : 'black' }}
            />
          </button>

          <div className='location-content'>
            {isEdit ? (
              <input
                className='location-input'
                placeholder={nickname}
                value={nickname}
                onChange={(e) => handleEditNickname(e, id)}
              />
            ) : (
              <h1 className='location-name'>{nickname}</h1>
            )}
            <p className='location-address'>{detail_address}</p>
          </div>
          {isEdit && (
            <button
              className='location-editBtn'
              onClick={() => handleDelete(id)}
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
