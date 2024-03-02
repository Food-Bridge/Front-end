import React, { useState, useEffect } from 'react';
import './Location.scss';
import { useDispatch } from 'react-redux';
import { updateAddresses } from '../../../redux/reducers/addressSlice';
import axiosInstance from '../../../api/instance';
import LocationList from '../../components/LocationList/LocationList';
import LocationSearch from '../LocationSearchPage/LocationSearch';

const Location = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get('/users/address/');
    dispatch(updateAddresses(res.data));
  };

  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSetDefault = async (id) => {
    await axiosInstance.patch(`/users/address/${id}`);
    fetchData();
  };

  const handleEditNickname = async (event, id) => {
    const { value } = event.target;
    await axiosInstance.patch(`/users/address/${id}/`, { nickname: value });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/users/address/${id}`);
    fetchData();
  };

  const handleClickAdd = async () => {
    setIsAdd(true);
  };

  const handleSearchComplete = () => {
    fetchData();
    setIsAdd(false);
  };

  return (
    <div className='location'>
      {isAdd ? (
        <div>
          <LocationSearch complete={handleSearchComplete} />
        </div>
      ) : (
        <div>
          <header className='location-header'>
            <h1 className='location-title'>주소 관리</h1>
            <button className='location-edit' onClick={handleToggleEdit}>
              {isEdit ? '완료' : '편집'}
            </button>
          </header>
          <button className='location-add' onClick={handleClickAdd}>
            주소 추가
          </button>
          <LocationList
            isEdit={isEdit}
            handleSetDefault={handleSetDefault}
            handleEditNickname={handleEditNickname}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Location;
