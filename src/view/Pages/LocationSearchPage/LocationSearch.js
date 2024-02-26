import React from 'react';
import DaumPostCode from 'react-daum-postcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LocationSearch = () => {
  const navigate = useNavigate();

  const handleComplete = (data) => {
    const address = data.address;
    const roadAddress = data.roadAddress;
    const jibunAddress = data.jibunAddress;
    const buildingName = data.buildingName || null;

    axios
      .post('http://127.0.0.1:8000/users/address/', {
        detail_address: address,
        road_address: roadAddress,
        jibun_address: jibunAddress,
        building_name: buildingName,
        user: 2,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
    navigate('/address');
  };

  return <DaumPostCode onComplete={handleComplete} className='post-code' />;
};

export default LocationSearch;
