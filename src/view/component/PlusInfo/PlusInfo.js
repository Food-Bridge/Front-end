import './PlusInfo.scss'

export default function PlusInfo({text}) {
  return (
    <button className='plusinfo'>
      <p className='plusinfo-text'>{text}</p>
    </button>
  )
}