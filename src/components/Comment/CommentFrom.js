import React, { useState } from "react";
import { Avatar, Button, CardContent, InputAdornment, OutlinedInput} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { PostWithAuth, RefreshToken } from "../../services/HttpService";

const useStyles=makeStyles((theme)=>({
    comment:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"flex-start",
        minWidth:"auto",
    alignItems:"center",
    },
    small:{
        
    },
    link:{
        textDecoration:"none",
        boxShadow:"none",
        color:"white",
    }

}));

function CommentForm (props){
    const {userId,userName,postId,setCommentRefresh}=props;
    const clases=useStyles();
    const [text,setText]=useState("");

    const logout= ()=>{
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey") 
        localStorage.removeItem("userName")
       
       
    }

    const saveComment=()=>{
        PostWithAuth("/comments",{
            postId:postId,
            userId:userId,
            text:text,
        })
        .then((res)=>{
            if(!res.ok){
                RefreshToken()
                .then((res)=>{
                    if(!res.ok){
                        logout();
                    }
                    else{
                       
                        res.json()
                    }
                    })
                .then((result)=>{
                    if(result!=undefined){
                        
                        localStorage.setItem("tokenKey",result.accessToken);
                        localStorage.setItem("refreshKey",result.refreshToken);
                        saveComment()
                    }
                })
                .catch((err) =>{
                    console.log(err);
                    /*if(err=="Unauthorized"){
                        logout();
                    }
                    else if(err==null){
                        saveComment()
                    }
                    */
                })
            }
            else{
                 res.json()
            }
            
        }
        )
        
       
        /*.catch((err)=>{
            if(err=="Unauthorized"){
                RefreshToken()
                .then((res)=>res.json())
                .then((result)=>{localStorage.setItem("tokenKey",result.accessToken);
                                localStorage.setItem("refreshKey",result.refreshToken);
                                })
                .catch((err) =>{
                    if(err=="Unauthorized"){
                        logout();
                    }
                    else if(err==null){
                        saveComment()
                    }
                })
            }
        })
        */
        
    }

    const handleSubmit=()=>{
        saveComment();
        setText("");
        setCommentRefresh();

    }
    const handleChange=(value)=>{
        setText(value);
    }

    return(
        <CardContent className={clases.comment}>
            <OutlinedInput 
            
            id="outlined-adorment-amount" 
            multiline
            inputProps={{maxLength:250}}
            fullWidth
            onChange={(i)=>handleChange(i.target.value)}
            startAdornment={
                <InputAdornment position="start">
                    <Link className={clases.link} to={{ pathname: '/users/' + userId }}>
                    <Avatar  aria-label="recipe" className={clases.small}>
                            {userName.charAt(0).toUpperCase()}
                           
                        </Avatar>
                         </Link>
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained"
                        style={{background:'linear-gradient(45deg,#2196f3 30%,#21CBF3 90%)',color:'white'}}
                        onClick={handleSubmit}
                        >
                            Comment
                        </Button>
                </InputAdornment>
            }
            value={text}
            >
               

            </OutlinedInput>

        </CardContent>

    )
}

export default CommentForm;