import './MyListBlock.scss'


export default function MyListBlock({icon,text}) {
  return (
    <button className='mylistBlock'>
      <div className='mylistBlock-content'>
        {icon}
        <h2 className='mylistBlock-text'>{text}</h2>
      </div>
    </button>
  );
}
