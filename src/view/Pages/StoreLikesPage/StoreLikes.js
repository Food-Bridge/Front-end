import React, {useState, useEffect} from 'react';
import './StoreLikes.scss';
import axiosInstance from '../../../api/instance';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import StoreCard from '../../components/StoreCard/StoreCard';
import { useNavigate } from 'react-router-dom';

export default function StoreLikes() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);

  const handleClickStore = (id) => {
    navigate(`/restaurant/${id} `);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/like/');
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <SearchBar />
      <h1 className='storeLikes-title'>즐겨찾기</h1>
      <div className='storeLikes-store'>
        {data.length > 0 &&
          data.map((el) => (
            <button key={el.id} onClick={() => handleClickStore(el.id)}>
              <StoreCard
                img={el.image}
                className={el.className}
                storeName={el.name}
                minimumPrice={el.minimumOrderPrice}
                deliverPrice={el.delivertyFee}
                storeScore={el.rating}
              />
            </button>
          ))}
      </div>
    </>
  );
}
