import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';


const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
   
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "black",
  },
  nav:{
      maxHeight:"50px",
  }
}));

function CustomNavbar(args) {
  const clases = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  //const firstCharacter = localStorage.getItem("userName").charAt(0).toUpperCase();
  

  const onClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
     window.location.reload();
    
    // Navbar verilerini güncelleyin
  }

  return (
    <div style={{ marginBottom: '100px' }}>
     <Navbar expand="sm" className="navbar-light bg-dark fixed-top" style={{ maxHeight: '70px' }}>
        <NavbarBrand className="text-white" style={{ marginLeft: '10px' }} >
        <Link className={clases.link} style={{color:'white'}} to={"/"}> Anasayfa</Link>
         
        </NavbarBrand>

        <Nav className="ml-auto d-flex align-items-center" navbar>
          

          <div className="d-flex align-items-center ml-3">
            <UncontrolledDropdown nav inNavbar className={clases.root}>
              <DropdownToggle nav className={clases.root}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ background: 'linear-gradient(45deg,#2196f3 30%,#21CBF3 90%)' }} aria-label="recipe">
                     
                      { localStorage.getItem("userName")==null ? ""
                      :localStorage.getItem("userName").charAt(0).toUpperCase()}
                    </Avatar>
                  }
                />
              </DropdownToggle>
              
              {localStorage.getItem("currentUser")==null? <DropdownMenu right>
                <DropdownItem>
                  <Link className={clases.link} to={"/auth"}>Login/Register</Link>
                </DropdownItem> </DropdownMenu>:
                <DropdownMenu>
                      <DropdownItem>
                  <Link className={clases.link} to={{ pathname: '/users/' + localStorage.getItem('currentUser') }}>
                    Profil
                  </Link>
                </DropdownItem>
                 <DropdownItem divider />
                <DropdownItem>
                <Link className={clases.link} onClick={onClick} to={"/auth"}> Çıkış Yap</Link>
                 
                  </DropdownItem>

                  </DropdownMenu>
                }


                
               
                  
              
            </UncontrolledDropdown>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
