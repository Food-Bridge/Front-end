import './PlusInfo.scss';

import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';

export default function PlusInfo({ text, arrow, onClick }) {
  return (
    <button className='plusinfo' onClick={onClick}>
      <p className='plusinfo-text'>
        {text}
        {arrow && (
          <IoIosArrowForward className='plusinfo-arrow' color='#8d8d8d' />
        )}
      </p>
    </button>
  );
}
