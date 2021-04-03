import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {StudentSidebarData} from './StudentSidebarData';
import {IconContext} from 'react-icons';
import "./images/logo.png"; 
import App from '../App';
import ReactDOM from 'react-dom'

function StudentNavbar() {
  function signout () {
    localStorage.clear();
    //to be changed to smarterlearning.in
    const url = new URL('http://localhost:3000');
    window.location.href = url;
  }
  
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return ( 
    <>
      <IconContext.Provider value = {{color:'#fff'}}>
        <p className="HomeUser">
          <nav className={sidebar ? 'nav-menu01 active' : 'nav-menu01'}>
            <ul className='nav-menu-items01'onClick = {showSidebar}>
              <li className="navbar-toggle01">
                <Link to="#" className = 'menu-bars01'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
                {StudentSidebarData.map((item,index) =>{
    return(
        <li key = {index} className = {item.cName}>
            <Link to = {item.path}>
                {item.icon}
                <span>
                    {item.title}
                </span>
            </Link>
        </li> 
        )
    })}
          </ul>
      </nav>
    </p>
    </IconContext.Provider>   
      <nav className='navbar'>
        <div>
            <Link to='#' className='menu-bars01'>
                <FaIcons.FaBars onClick = {showSidebar}/> 
            </Link>
            <img className="logo" src="https://i.ibb.co/b2gNzNp/logo.png" alt="logo" border="0"/>
        </div>
        <div>
          <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-sign-in-alt'} />
          </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
          <Link onClick = {signout} >Sign Out</Link>
          </li>
           {/* 
        <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
          <Link
          
            className='nav-links'
            onClick={closeMobileMenu}
          >
            Sign In <i className='fas fa-caret-down' />
          </Link>
          {dropdown && <Dropdown />}
          </li>
            
          <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li>
            <div>
        <img className="logo01" src="https://i.ibb.co/tPBqzm4/loogo.png" />
        </div>*/}  
        </ul>
    </div>
    
          </nav>
          <main className="wrapper">
            <section className="hero">
              <h1>Smarter Learning's</h1>
                <article>
                  <p>Welcome</p>
                 <Link to="contact"><a href="#webpage">Contact Us</a></Link> 
                </article>
              </section>
              </main>
        </>
  );
}
export default StudentNavbar;