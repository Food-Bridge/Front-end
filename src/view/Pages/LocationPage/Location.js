import { CiLocationOn } from 'react-icons/ci';
import './Location.scss'
import { useNavigate } from 'react-router-dom';

export default function Location() {
  const navigate = useNavigate()

  const locations = [
    { name: '우리집', address: '서울시 강남구 역삼로 111 1층' },
    { name: '친구집', address: '서울시 강남구 역삼로 222 2층' },
    { name: '직장', address: '서울시 강남구 역삼로 333 3층' },
  ];

  const handleClickAdd = () => {
    navigate('/location/search')
  }
  return (
    <div className='location'>
      <header className='location-header'>
        <h1 className='location-title'>주소 관리</h1>
        <button className='location-edit'>편집</button>
      </header>
      <button className='location-add' onClick={handleClickAdd}>주소 추가</button>
      {locations.map(({name, address}) => {
        return (
          <button className='location-button'>
            <CiLocationOn className='location-icon' />
            <div className='location-content'>
              <h1 className='location-name'>{name}</h1>
              <p className='location-address'>{address}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
