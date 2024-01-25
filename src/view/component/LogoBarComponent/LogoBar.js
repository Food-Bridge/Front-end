import React, { Component } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { LuUserCircle2 } from "react-icons/lu";
import "./LogoBar.scss";

class LogoBar extends Component {
    render() {
        return (
            <div className='LogoBar'>
                <header className='logoBar-frame'>
                    <div className='logoBar-margin'>
                        <div className='logoBar-home'><AiOutlineHome className='logoBar-homeIcon'/></div>
                        <div className='logoBar-logo'><h1 className='logoBar-logoText'>LOGO</h1></div>
                        <div className='logoBar-user'><LuUserCircle2 className='logoBar-userIcon'/></div>
                    </div>
                </header>
            </div>
        )
    }

}

export default LogoBar;
