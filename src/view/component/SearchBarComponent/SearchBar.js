import React from 'react';
import "./SearchBar.scss";
import { CiLocationOn, CiHeart, CiShoppingBasket } from "react-icons/ci";
import { RiArrowDropDownFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

function SearchBar({location, count}) {
  return (
    <div className='SearchBar'>
      <header className='searchBar-frame'>
        <div className='searchBar-margin'>
            <div className='searchBar-location'>
                <CiLocationOn className='searchBar-locaIcon'/>
                <h1 className='searchBar-locaName'>{location}</h1>
                <RiArrowDropDownFill className='searchBar-arrowIcon'/>
            </div>
            <div className='searchBar-input'>
                <div className='searchBar-inputBox'>
                    <IoIosSearch className='searchBar-searchIcon'/>
                </div>
            </div>
            <div className='searchBar-etcIcon'>
                <CiHeart className='searchBar-heartIcon'/>
                <div className='searchBar-shopCount'>
                    <CiShoppingBasket className='searchBar-shopIcon'/>
                    <div className='searchBar-countBlock'><h1 className='searchBar-countText'>{count}</h1></div>
                </div>
            </div>
        </div>

      </header>
    </div>
  )
}

export default SearchBar
