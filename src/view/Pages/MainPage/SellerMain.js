import { useNavigate } from 'react-router-dom'
import './SellerMain.scss'

export default function SellerMain() {
  const navigate = useNavigate()
  return (
    <div className='sellerMain'>
      <h1 className='sellerMain-title'>판매자 메인</h1>
      <button onClick = { () => navigate('/storeupload')}className='sellerMain-btn'>매장 관리</button>
      <button className='sellerMain-btn'>메뉴 관리</button>
    </div>
  )
}