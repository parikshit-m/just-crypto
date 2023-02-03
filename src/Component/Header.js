
import React from 'react'
import '../Styles/Header.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
// import {} from './CoinTable'
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    const[openLinks,setOpenLinks]=useState(false);
    const toggle=()=>{
        setOpenLinks(!openLinks)
        // console.log("clicked")
    }


    return (
        <div className="navbar" >
            <Link to="/"><h1>Just Crypto</h1></Link>
            <MenuIcon className="icon" onClick={toggle}/>
            <div className="navLink" id={openLinks?"open":"close"}>
                
                <Link to="/" onClick={toggle}>Home</Link>
                <Link to="/news" onClick={toggle}>News</Link>
                <Link to="/exchange" onClick={toggle}>Converter</Link>
                {/* <select>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
            </select> */}
            </div>
        </div>

    )
}

export default Header
