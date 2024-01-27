import './Store.scss';
import StoreDeliverTogo from '../../components/StoreDeliverTogo/StoreDeliverTogo.js';
import MenuBlock from '../../components/MenuBlock/MenuBlock.js';

import storeImg from '../../../data/chicken2.jpg';
import { CiShoppingBasket, CiPhone, CiHeart } from 'react-icons/ci';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import PlusInfo from '../../components/PlusInfo/PlusInfo.js';

export default function Store({ count }) {
  function roundRates(number) {
    return Math.round(number * 2) / 2;
  }
  const rate = roundRates(4.72);
  let rateStars;
  if (rate % 1 === 0) {
    rateStars = Array(rate).fill(<FaStar color='#ffc700' />);
  } else {
    const intPart = Math.floor(rate);
    rateStars = Array(intPart).fill(<FaStar color='#ffc700' />);
    rateStars.push(<FaStarHalf color='#ffc700' />);
  }

  return (
    <div className='store'>
      <div className='store-main'>
        <img className='store-img' src={storeImg} alt='chicken img'></img>
        <div className='store-basket'>
          <CiShoppingBasket size='30' color='white' />
          <div className='store-basketCount'>
            <h1 className='store-basketText'>{count}</h1>
          </div>
        </div>

        <div className='store-title'>
          <h1 className='store-name'>000치킨 00점</h1>
          <div className='store-icon'>
            <CiPhone size='30' />
            <CiHeart size='30' color='red' />
          </div>
        </div>
        <p className='store-rate'>
          {rate} {rateStars}
        </p>
        <div className='store-detail'>
          <h2 className='store-detailText'>찜</h2>
          <p className='store-detailNum'>354</p>
          <h2 className='store-detailText'>리뷰</h2>
          <p className='store-detailNum'>1503</p>
          <PlusInfo text='더보기' arrow='true' />
        </div>
      </div>
      <StoreDeliverTogo />
      <div className='store-menu'>
        <h2 className='store-menuTitle'>인기메뉴</h2>
        <div className='store-menuBlocks'>
          <MenuBlock popular={true} />
          <MenuBlock />
          <MenuBlock />
        </div>
      </div>
    </div>
  );
}
