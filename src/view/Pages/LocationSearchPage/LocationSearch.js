import { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';

const LocationSearch = () => {
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        
        const {addressType, bname, buildingName} = data
        if (addressType === 'R') {
            if (bname !== '') {
                extraAddress += bname;
            }
            if (buildingName !== '') {
                extraAddress += `${extraAddress !== '' && ', '}${buildingName}`;
            }
            fullAddress += `${extraAddress !== '' ? ` ${extraAddress}` : ''}`;
        }
    }
    return (<DaumPostCode onComplete={handleComplete} className="post-code" />);
}
export default LocationSearch;