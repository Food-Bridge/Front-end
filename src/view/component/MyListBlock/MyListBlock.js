import './MyListBlock.scss'
import { IoSettingsOutline } from "react-icons/io5";

export default function MyListBlock() {
  return (
    <button className='mylistBlock'>
      <div className='mylistBlock-content'>
        <IoSettingsOutline size='35'/>
        <h2 className='mylistBlock-text'>설정</h2>
      </div>
    </button>
  );
}
