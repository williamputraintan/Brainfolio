  import React from 'react';
  import { Nav, Navbar, Form, FormControl,Row,Col,NavDropdown,Button} from "react-bootstrap";
  import logo from "../images/logo-transparent.png"
  import SearchIcon from '@material-ui/icons/Search';

import './NavBar.css';

  function SearchBar(props){
    
      return <Form className='searchbar'>
           <Form.Row>
           <Col xs={10}>
                
                 <Form.Control placeholder="Search" />
              </Col>
               <Col >
                 <Button variant="link"><SearchIcon/></Button>
              </Col>  
            </Form.Row>
           </Form>;
    
  }
 

  
  export default function NavigationBar(props) {
  
    return (    
        <Navbar variant="light" sticky="top" class='navbar'>
         <Navbar.Brand href="/" expand="lg" >
           <img
            src={logo}
            width="150px"
            className="d-inline-block align-top"
            class='img'
            alt="Brainfolio logo"
          />
        </Navbar.Brand>
       
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/aboutUs">About Us</Nav.Link>  
        </Nav>
        
        <Form className='searchbar'>
           <Form.Row>
           <Col xs={10}>
                
                 <Form.Control placeholder="Search" />
              </Col>
               <Col >
                 <Button variant="link"><SearchIcon/></Button>
              </Col>  
            </Form.Row>
           </Form>
      </Navbar>
    );
  }
  