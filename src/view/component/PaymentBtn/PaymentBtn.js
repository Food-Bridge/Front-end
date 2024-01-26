import React from 'react'
import './PaymentBtn.scss'

function PaymentBtn({payNumber}) {
  return (
    <div className='PaymentBtn'>
        <header className='paymentBtn-frame'>
            <h1 className='paymentBtn-text'>{payNumber}원 배달 결제하기</h1>
        </header>
    </div>
  )
}

export default PaymentBtn
