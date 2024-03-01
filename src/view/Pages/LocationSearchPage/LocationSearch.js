import React from 'react';
import DaumPostCode from 'react-daum-postcode';
import axiosInstance from '../../../api/instance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LocationSearch = () => {
  const navigate = useNavigate();

  const handleComplete = (data) => {
    const address = data.address;
    const roadAddress = data.roadAddress;
    const jibunAddress = data.jibunAddress;
    const sigungu = data.sigungu;
    const buildingName = data.buildingName || null;

    axiosInstance.post('/users/address/', {
      detail_address: address,
      road_address: roadAddress,
      jibun_address: jibunAddress,
      building_name: buildingName,
      sigungu: sigungu,
    });

    navigate('/address');
  };

  return <DaumPostCode onComplete={handleComplete} className='post-code' />;
};

export default LocationSearch;
