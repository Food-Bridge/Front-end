import React from 'react';
import DaumPostCode from 'react-daum-postcode';
import axiosInstance from '../../../api/instance';

const LocationSearch = ({ complete }) => {
  const handleComplete = async (data) => {
    const { address, roadAddress, jibunAddress, sigungu, buildingName } = data;
    await axiosInstance.post('/users/address/', {
      detail_address: address,
      road_address: roadAddress,
      jibun_address: jibunAddress,
      building_name: buildingName || null,
      sigungu: sigungu,
    });
    complete();
  };

  return (
    <div>
      <DaumPostCode onComplete={handleComplete} className='post-code' />;
    </div>
  );
};

export default LocationSearch;
