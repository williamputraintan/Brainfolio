import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../images/logo-white.png';
import { Navbar} from "react-bootstrap";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

 

  return (
    
     <Navbar variant="light" sticky="top" className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={logo}></img>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          
          <li className='nav-item'>
            <Link to='/aboutUs' className='nav-links' onClick={closeMobileMenu}>
               About Us
            </Link>
          </li> 
            
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Sign In
            </Link>
          </li>   
        </ul>
        <div >
        <Link to='signUp'class='buttons'>
              
          Sign Up
              
        </Link>
        <Link to='signIn'class='buttons'>
           
          Sign In
           
          </Link>
        </div>


          
        
      
      </Navbar>
    
  );
}

export default NavBar;