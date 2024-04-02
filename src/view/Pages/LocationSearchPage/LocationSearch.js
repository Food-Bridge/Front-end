import React from 'react';
import DaumPostCode from 'react-daum-postcode';
import axiosInstance from '../../../api/instance';
import Swal from 'sweetalert2';

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
    Swal.fire({
      icon: 'info',
      title: '주소 등록',
      text: '주소가 성공적으로 등록되었습니다.',
      showCancelButton: false,
      confirmButtonText: '확인',
      confrimButtonColor: 'black',
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
