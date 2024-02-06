import { CiLocationOn } from 'react-icons/ci';
import './Location.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Location() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/1/address/')
      .then(function (response) {
        console.log(response);
        setLocations(response.data)
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, []);

  // const locations = [
  //   { name: '우리집', address: '서울시 강남구 역삼로 111 1층' },
  //   { name: '친구집', address: '서울시 강남구 역삼로 222 2층' },
  //   { name: '직장', address: '서울시 강남구 역삼로 333 3층' },
  // ];
  const [isEdit, setIsEdit] = useState(false);

  const handleClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleClickAdd = () => {
    navigate('searchLocation/');
  };

  const handleClickDelete = (name, address) => {
    axios
      .delete('http://127.0.0.1:8000/1/address/', {
        data: {
          name: name,
          address: address,
        },
      })
      .then(function (response) {
        console.log(response);
        setLocations((prevLocations) =>
          prevLocations.filter((loc) => loc.name !== name)
        );
      })
      .catch(function (error) {
        console.log(error.response.data);
      });

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
        {locations.map(({ name, address }) => {
          return (
            <button className='location-button'>
              <CiLocationOn className='location-icon' />
              <div className='location-content'>
                <h1 className='location-name'>{name}</h1>
                <p className='location-address'>{address}</p>
              </div>
              {isEdit && (
                <button className='location-delete' onClick={handleClickDelete}>
                  X
                </button>
              )}
            </button>
          );
        })}
      </div>
    );
  };
}
