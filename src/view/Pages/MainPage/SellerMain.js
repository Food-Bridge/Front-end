import { useNavigate } from 'react-router-dom';
import './SellerMain.scss';
import { useSelector } from 'react-redux';
import { selectOwner } from '../../../redux/reducers/authSlice';
import Modal from '../../components/Modal/Modal';

export default function SellerMain() {
  const owner = useSelector(selectOwner);
  const navigate = useNavigate();
  const handleClickShowStore = () => {
    if (owner) navigate('/myStore/');
    else {
      alert('아직 매장이 등록되지 않았습니다.');
      navigate('/storeUpload/');
    }
  };
  return (
    <div className='sellerMain'>
      <h1 className='sellerMain-title'>판매자 메인</h1>
      <button className='sellerMain-btn' onClick={handleClickShowStore}>
        나의 매장 보기
      </button>
      <button
        className='sellerMain-btn'
        onClick={() => navigate('/storeUpload/')}
      >
        매장 정보 관리
      </button>
    </div>
  );
}
