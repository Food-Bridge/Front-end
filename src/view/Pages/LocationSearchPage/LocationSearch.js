import React from 'react';
import DaumPostCode from 'react-daum-postcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LocationSearch = () => {
  const navigate = useNavigate();

  const handleComplete = (data) => {
    const zonecode = data.zonecode;
    const roadAddress = data.roadAddress;
    const jibunAddress = data.jibunAddress;
    const buildingName = data.buildingName;

    axios
      .post('http://127.0.0.1:8000/users/4/address/', {
        zonecode: zonecode,
        road_address: roadAddress,
        jibun_address: jibunAddress,
        building_name: buildingName,
      })
      .then(function (response) {
        console.log(response);
        navigate('address/');
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  return <DaumPostCode onComplete={handleComplete} className='post-code' />;
};

export default LocationSearch;
