import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Snackbar from '@mui/material/Snackbar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import MuiAlert from '@mui/material/Alert';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import { PostWithAuth } from "../../services/HttpService";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
   // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const useStyles = makeStyles((theme) => ({
    centeredCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '50%',
        maxWidth: 700,
        minWidth:371,
        //margin:20,
        margin: 'auto',
        marginBottom:20,
        marginTop:20,
        textAlign: 'left'
        
      },
      
    root: {
        width: '800',
        textAlign : "left",
        margin : 20,
      },
      link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white",
    }
  }));
function PostForm(props) {
    const clases = useStyles();
    const { userId,userName,setPostRefresh} = props;


    const[text,setText]=useState("");
    const[title,setTitle]=useState("");

    const[isSent,setİsSent]=useState(false);


    const savePost=()=>{
        PostWithAuth("/posts",{
            title:title,
            userId:userId,
            text:text,
        })
        .then((res)=>res.json())
        .catch((err)=>console.log("eror"))
        
    }
    
    const handleSubmit = ()=>{
        savePost();
        setİsSent(true);
        setText("");
        setTitle("");
        setPostRefresh();
        
    }

   



    const handleTitle=(value)=>{
            setTitle(value);
            setİsSent(false);
    }

    const handleText=(value)=>{
        setText(value);
        setİsSent(false);
}

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
         return;
        }

        setİsSent(false);
        };



    
    return (
         <div >
        <Snackbar open={isSent} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Postunuzu başarılı bir şekilde paylaşıldı
            </Alert>
        </Snackbar>
       
            <Card  className={clases.centeredCard}>
                <CardHeader
                    avatar={
                        <Link className={clases.link} to={{ pathname: '/users/' + userId }}>
                        <Avatar sx={{ background:'linear-gradient(45deg,#2196f3 30%,#21CBF3 90%)' }} aria-label="recipe">
                            {userName.charAt(0).toUpperCase()}
                           
                        </Avatar>
                         </Link>
                    }
                    
                    title={<OutlinedInput id="
                    outlined-adorment-amount" 
                    multiline
                    placeholder="title"
                    inputProps={{maxLength:25}}
                    fullWidth
                    value={title}
                   onChange={(i)=>handleTitle(i.target.value)}
                    >

                    </OutlinedInput>}
                    
                />
                
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {
                    <OutlinedInput id="outlined-adorment-amount" 
                    multiline
                    placeholder="text"
                    inputProps={{maxLength:250}}
                    fullWidth
                    value={text}
                    onChange={(i)=>handleText(i.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                        <Button variant="contained"
                        style={{background:'linear-gradient(45deg,#2196f3 30%,#21CBF3 90%)',color:'white'}}
                        onClick={handleSubmit}
                        >
                            Post
                        </Button>
                         </InputAdornment>
                    }
                    >

                    </OutlinedInput>}
                        
                    </Typography>
                </CardContent>
                
            </Card>

        </div>
        
    )
}
export default PostForm;