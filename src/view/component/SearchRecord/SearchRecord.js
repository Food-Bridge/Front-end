import './SearchRecord.scss'

export default function SearchRecord({text}) {
  return (
    <div className="searchRecord">
      <p className='searchRecord-text'>{text}</p>
      <p className="searchRecord-delete">X</p>
    </div>
  )
}