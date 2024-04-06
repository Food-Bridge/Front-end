import { useNavigate } from 'react-router-dom';
import './SellerMain.scss';
import { useSelector } from 'react-redux';
import { selectOwner } from '../../../redux/reducers/authSlice';
import Swal from 'sweetalert2';

export default function SellerMain() {
  const owner = useSelector(selectOwner);
  const navigate = useNavigate();
  const handleClickShowStore = () => {
    if (owner) navigate('/myStore/');
    else {
      Swal.fire({
        icon: 'info',
        title: '알림',
        html: '아직 매장이 등록되지 않았습니다.<br>매장 등록 페이지로 이동합니다.',
        showCancelButton: false,
        confirmButtonText: '확인',
        confrimButtonColor: 'black',
      });
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
