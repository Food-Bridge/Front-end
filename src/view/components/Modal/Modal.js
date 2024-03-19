import React from 'react';
import './Modal.scss';

export default function Modal({
  twoBtn,
  onConfirm,
  onCancel,
  contents,
  title,
}) {
  return (
    <div className='modal-container'>
      <div className='modal'>
        <h1 className='modal-title'>{title}</h1>
        {contents.map((content, index) => {
          return (
            <p key={index} className='modal-content'>
              {content}
            </p>
          );
        })}

        {twoBtn ? (
          <div className='modal-button'>
            <button className='modal-twoBtn' onClick={onConfirm}>
              확인
            </button>
            <button className='modal-twoBtn' onClick={onCancel}>
              취소
            </button>
          </div>
        ) : (
          <div className='modal-button' onClick={onConfirm}>
            <button className='modal-oneBtn'>확인</button>
          </div>
        )}
      </div>
    </div>
  );
}
