import './MenuBlock.css';

import chickenImg from '../../../data/chicken.jpg';

export default function MenuBlock() {
  return (
    <button className='menublock'>
      <div className='menublock-content'>
        <div className='menublock-title'>
          <div className='menublock-tag'>
            <p className='menublock-tag-title'>인기</p>
          </div>
          <h1 className='menublock-name'>반반 치킨</h1>
        </div>
        <h2 className='menublock-price'>21,900원</h2>
        <p className='menublock-info'>
          출판되게 폭넓는 개선이 사찰이어 심사가 점수의, 소아다 제기하다.
          45퍼센트 참여하다 쉽고 있은 있고,
        </p>
      </div>
      <img className='menublock-image' src={chickenImg} alt='반반 치킨'></img>
    </button>
  );
}
