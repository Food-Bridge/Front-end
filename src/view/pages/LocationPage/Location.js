import React, { useState } from 'react';
import './Location.scss';
import { editAddressesNicknames } from '../../../redux/reducers/addressSlice';
import { useDispatch } from 'react-redux';

import LocationList from '../../components/LocationList/LocationList';
import LocationSearch from '../LocationSearchPage/LocationSearch';

const Location = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [editedNicknames, setEditedNicknames] = useState({});
  const [loading, setLoading] = useState(true);

  const handleEditAddressNickname = (id, value) => {
    setEditedNicknames((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleToggleEdit = () => {
    setIsEdit((prevIsEdit) => !prevIsEdit);
  };

  const handleClickAdd = () => {
    setIsAdd(true);
  };

  const handleCompleteAdd = () => {
    setIsAdd(false);
  };

  const handleCompleteEditing = () => {
    setIsEdit(false);
    const updatedNicknames = Object.entries(editedNicknames).map(
      ([id, nickname]) => ({ id, nickname })
    );
    updatedNicknames.forEach((update) => {
      dispatch(editAddressesNicknames(update));
    });
  };

  return (
    <div className='location'>
      {isAdd ? (
        <LocationSearch complete={handleCompleteAdd} />
      ) : (
        <div>
          <header className='location-header'>
            <h1 className='location-title'>주소 관리</h1>
            {loading ? (
              <p className='location-nothing'>로딩중입니다.</p>
            ) : (
              <button
                className='location-edit'
                onClick={isEdit ? handleCompleteEditing : handleToggleEdit}
              >
                {isEdit ? '완료' : '편집'}
              </button>
            )}
          </header>
          <button className='location-add' onClick={handleClickAdd}>
            주소 추가
          </button>
          <LocationList
            setLoading={setLoading}
            isEdit={isEdit}
            handleEditAddressNickname={handleEditAddressNickname}
            editedNicknames={editedNicknames}
          />
        </div>
      )}
    </div>
  );
};

export default Location;
