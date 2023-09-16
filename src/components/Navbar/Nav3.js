import { makeStyles } from '@mui/styles';
import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem 
} from 'reactstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
  nav: {
    maxHeight: "50px",
  },
  ıtem:{
    marginLeft:"500px"
  }
}));
const onClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
 
  }

  
  

  
  

function Nav3() {
  const [isOpen, setIsOpen] = useState(false);
  const [yenile,setYenile]=useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }
 let navigate=useNavigate();
  const btnClick = ()=>{
    navigate("/search")
  }

 
  
 

  const clases = useStyles();

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/" style={{ color: 'white' }}>SclApp</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
  <Nav tabs pills className="mr-auto" navbar>
    <NavItem>
      <NavLink href="/" style={{ color: 'white' }}>Anasayfa</NavLink>
    </NavItem>
   
    <NavItem>
      <NavLink href={'/users/' + localStorage.getItem('currentUser')} style={{ color: 'white' }}>
        Profile
      </NavLink>
    </NavItem>
  </Nav>
  <Nav tabs navbar style={{ marginLeft: 'auto' }}> 

  <NavItem>

    {localStorage.getItem("currentUser")?<form class="d-flex"style={{marginRight:"10px"}} role="search">
        <input class="form-control me-2"  type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-primary" type="submit" onClick={btnClick}>Search</button>
      </form>:""}
  
  </NavItem>

    <NavItem className="ml-3" edge="end">
      {localStorage.getItem("currentUser") == null ? (
        <NavLink href="/auth" style={{ color: 'white' }}>Giriş Yap/Kayıt Ol</NavLink>
      ) : (
        <NavLink onClick={onClick} href="/" style={{ color: 'white' }}>Çıkış Yap</NavLink>
      )}
    </NavItem>
  </Nav>
</Collapse>

      </Navbar>
    </div>
  );
}

export default Nav3;
