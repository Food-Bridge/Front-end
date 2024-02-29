import { CiLocationOn } from 'react-icons/ci';
import './Location.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Location() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedNicknames, setEditedNicknames] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/users/address/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setLocations(response.data);
        setEditedNicknames(new Array(response.data.length).fill('')); // 배열 초기화
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, []);

  const handleClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleClickAdd = () => {
    navigate('/searchLocation/');
  };

  const handleClickDelete = (id, detail_address, index) => {
    axios
      .delete(`http://127.0.0.1:8000/users/address/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setLocations((prevLocations) =>
          prevLocations.filter((loc) => loc.detail_address !== detail_address)
        );
        setEditedNicknames((prevNicknames) =>
          prevNicknames.filter((_, i) => i !== index)
        );
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const handleChangeNickname = (event, index) => {
    const { value } = event.target;
    setEditedNicknames((prevNicknames) =>
      prevNicknames.map((nickname, i) => (i === index ? value : nickname))
    );
  };

  const handleSubmitNickname = (id, index) => {
    const editedNickname = editedNicknames[index];
    axios
      .patch(
        `http://127.0.0.1:8000/users/address/${id}/`,
        {
          nickname: editedNickname,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
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
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const setIsDefault = (id) => {
    const updatedLocations = locations.map((loc) => ({
      ...loc,
      is_default: loc.id === id ? true : false,
    }));
  
    const updatedLocationToSend = updatedLocations.map(location => {
      if (location.id === id) {
        return { ...location, is_default: true };
      }
      return location;
    });
  
    axios
      .patch(
        `http://127.0.0.1:8000/users/address/${id}/`,
        { },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setLocations(updatedLocations);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
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
