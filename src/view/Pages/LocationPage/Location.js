import { CiLocationOn } from 'react-icons/ci';
import './Location.scss';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/instance';
import React, { useState, useEffect } from 'react';

export default function Location() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedNicknames, setEditedNicknames] = useState([]);
  const [defaultId, setDefaultId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/users/address/');
        if (res.data) {
          setLocations(res.data);
          setEditedNicknames(new Array(res.data.length).fill(''));
          const defaultIdValue = res.data.find(
            (item) => item.is_default === true
          );
          if (defaultIdValue) {
            setDefaultId(defaultIdValue);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleClickAdd = () => {
    navigate('/searchLocation/');
  };

  const handleClickDelete = (id, detail_address, index) => {
    axiosInstance.delete(`/users/address/${id}`);
    setLocations((prevLocations) =>
      prevLocations.filter((loc) => loc.detail_address !== detail_address)
    );
    setEditedNicknames((prevNicknames) =>
      prevNicknames.filter((_, i) => i !== index)
    );
  };

  const handleChangeNickname = (event, index) => {
    const { value } = event.target;
    setEditedNicknames((prevNicknames) =>
      prevNicknames.map((nickname, i) => (i === index ? value : nickname))
    );
  };

  const handleSubmitNickname = (id, index) => {
    const editedNickname = editedNicknames[index];
    axiosInstance.patch(`/users/address/${id}/`, {
      nickname: editedNickname,
    });

    setLocations((prevLocations) =>
      prevLocations.map((loc, idx) => {
        if (idx === index) {
          return {
            ...loc,
            nickname: editedNickname,
          };
        }
        return loc;
      })
    );
    setIsEdit(false);
  };

  const setIsDefault = (id) => {
    if (defaultId) {
      axiosInstance.patch(`/users/address/${defaultId}`, { is_default: false });
    }
    axiosInstance.patch(`/users/address/${id}`, { is_default: true });
  };

  return (
    <div className='location'>
      <header className='location-header'>
        <h1 className='location-title'>주소 관리</h1>
        <button className='location-edit' onClick={handleClickEdit}>
          {isEdit ? '완료' : '편집'}
        </button>
      </header>
      <button className='location-add' onClick={handleClickAdd}>
        주소 추가
      </button>
      {locations.map(({ nickname, detail_address, is_default, id }, index) => (
        <div className='location-button' key={id}>
          <button onClick={() => setIsDefault(id)}>
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
                value={editedNicknames[index]}
                onChange={(e) => handleChangeNickname(e, index)}
              />
            ) : (
              <h1 className='location-name'>{nickname}</h1>
            )}
            <p className='location-address'>{detail_address}</p>
          </div>
          {isEdit && (
            <button
              className='location-editBtn'
              onClick={() => handleSubmitNickname(id, index)}
            >
              저장
            </button>
          )}
          {isEdit && (
            <button
              className='location-editBtn'
              onClick={() => handleClickDelete(id, detail_address, index)}
            >
              삭제
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
