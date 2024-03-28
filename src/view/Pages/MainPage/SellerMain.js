import { useNavigate } from 'react-router-dom';
import './SellerMain.scss';

export default function SellerMain() {
  const navigate = useNavigate();
  return (
    <div className='sellerMain'>
      <h1 className='sellerMain-title'>판매자 메인</h1>
      <button className='sellerMain-btn' onClick={() => navigate('/myStore/')}>
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
