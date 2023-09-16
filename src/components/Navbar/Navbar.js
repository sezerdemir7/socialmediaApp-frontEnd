import React from "react";
import { Link } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import { LockOpen } from "@mui/icons-material";



const useStyles = makeStyles((theme) => ({

    title:{
        flexGrow:1,
        textAlign:"left",
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white",
    }
}));


function Navbar() {
    
    

   

    const clases = useStyles();
    const onClick= ()=>{
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey") 
        localStorage.removeItem("userName")
       
       
    }

    

    return (
        <div>

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" className={clases.title}>
                        <Link className={clases.link} to="/" >Home</Link>
                    </Typography>
                    <Typography variant="h6" component="div" >
                        {localStorage.getItem("currentUser")==null? <Link className={clases.link} to={"/auth"}>Login/Register</Link> :
                        <div>
                        <IconButton onClick={onClick} className={clases.link} ><LockOpen></LockOpen></IconButton>
                        <Link className={clases.link} to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}>Profile</Link>
                        </div>}
                        <Button color="inherit"></Button>
                    </Typography>
                </Toolbar>
            </AppBar>




        </div>
    )
}


export default Navbar;