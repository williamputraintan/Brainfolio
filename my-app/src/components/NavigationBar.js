  import React from 'react';
  import { Nav, Navbar} from "react-bootstrap";
  import {Button} from '@material-ui/core';
  import logo from "../images/bluebulb-logo-t.png"

import './NavBar.css';
  
  export default function NavigationBar() {
  
    return (
      
      
      <Navbar variant="light" sticky="top" class='navbar'>
        <Navbar.Brand href="/" expand="lg">
          <img
            src={logo}
            width="150px"
            className="d-inline-block align-top"
            alt="Brainfolio logo"
          />
        </Navbar.Brand>
        <Nav>
          <Button><Nav.Link href="/">Home</Nav.Link></Button>
          <Button><Nav.Link href="#link">Link</Nav.Link></Button>
        </Nav>
      </Navbar>
    );
  }
