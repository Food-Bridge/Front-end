import React, { Component } from 'react'
import './PaymentMethod.scss'
import logo from '../../../data/tossIcon.png';


class PaymentMethod extends Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedOption: "option1"
        };
      }
    
      handleOptionChange = changeEvent => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
      };

    render() {
        return (
            <div className='PaymentMethod'>
            <div className='paymentMethod-frame'>
                <h1 className='paymentMethod-title'>결제수단</h1>
                <div className='paymentMethod-margin'>
                    <div className='paymentMethod-direct'>
                        <input 
                            type="radio"
                            name="react-tips"
                            value="option1"
                            checked={this.state.selectedOption === "option1"}
                            onChange={this.handleOptionChange}               
                            className='paymentMethod-directRadio'
                        />
                        <h1 className='paymentMethod-directText'>직접 결제 (현금, 카드)</h1>
                    </div>
                    <div className='paymentMethod-toss'>
                        <input 
                            type="radio"
                            name="react-tips"
                            value="option2"
                            checked={this.state.selectedOption === "option2"}
                            onChange={this.handleOptionChange}
                            className='paymentMethod-tossRadio'
                        />
                        <h1 className='paymentMethod-tossText'><img src={logo} alt="tossLogo" className='paymentMethod-tossLogo'/> 토스페이</h1>
                    </div> 
                </div>

            </div>
            </div>
        )
    }
}

export default PaymentMethod
