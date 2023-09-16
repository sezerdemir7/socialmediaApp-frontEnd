import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
import {  PostWithoutAuth } from "../../services/HttpService";


function Auth(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    
  
    let navigate = useNavigate();
    

    const handleUsername=(value)=>{
        setUsername(value);
    }
    const handlePassword= (value)=>{
        setPassword(value);
    }

    const sendRequest = (path) => {
        PostWithoutAuth("/auth/" + path, {
          userName: username,
          password: password,
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Kullanıcı adı veya şifre yanlış."); 
              
            }
          })
          .then((result) => {
            localStorage.setItem("tokenKey", result.accessToken);
            localStorage.setItem("refreshKey", result.refreshToken);
            localStorage.setItem("currentUser", result.userId);
            localStorage.setItem("userName", username);
            window.location.reload()
           

          })
          .catch((err) => {
            alert(err.message); // Hata mesajını kullanıcıya göster
            console.log(err);
            
          });
      };

    const handleButton= (path)=>{
        sendRequest(path);
        setUsername("");
        setPassword("");
               
    }

    


    return(

   <FormControl>
        <InputLabel style={{top:10}} >Username</InputLabel>
        <Input style={{top:5}} onChange={(i)=> handleUsername(i.target.value)} />
        <InputLabel style={{top:80}}>Password</InputLabel>
        <Input type="password" style={{top:40}} onChange={(i)=> handlePassword(i.target.value)} />
        <Button variant="contained"
            style={{marginTop:60,
            background:'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',
            color:'white'}}
            onClick={()=>handleButton("register")}> Register </Button>
        <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
        <Button variant="contained"
            style={{marginTop:0,
            background:'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',
            color:'white'}}
            onClick={()=>handleButton("login")}> Login </Button>    

       
   </FormControl>

    )
        
    
}
export default Auth;