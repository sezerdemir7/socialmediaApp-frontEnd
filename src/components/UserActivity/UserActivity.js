import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Post from "../Post/Post";
import { makeStyles } from "@mui/styles";
import { GetWithAuth } from "../../services/HttpService";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
    minWidth: 100,
    maxWidth: 800,
    marginTop: 50,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: 2,
    flex: 1,
  },
  postt: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%', /* Öğenin maksimum genişliği, ekranın genişliğine bağlı olarak ayarlayabilirsiniz */
    minWidth: '50%',
    padding: 20,
    //backgroundColor: '#E6FCFB', /* İstenilen arka plan rengi */
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
 
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {
    const classes = useStyles();
    const {isOpen, postId, setIsOpen} = props;
    const [open, setOpen] = useState(isOpen); 
    const [post, setPost] = useState();

    const getPost = () => {
        GetWithAuth("/posts/"+postId)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setPost(result);
            },
            (error) => {
                console.log(error)
            }
        )
        }

    const handleClose = () => {
      setOpen(false);
      setIsOpen(false);
    };


    useEffect(() => {
        setOpen(isOpen);
      }, [isOpen]);

    useEffect(() => {
        getPost();
    }, [postId])

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.postt}> 
        {post? <Post likes = {post.postLikes} postId = {post.id} userId = {post.userId} userName = {post.userName}  
                    title={post.title} text={post.text}></Post>: "loading"}
                    </div>
      </Dialog>
    )
}


function UserActivity(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows, setRows] = useState([]);
    const {userId} = props;
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState();
    const [selectedPost, setSelectedPost] = useState();
  
    const handleNotification = (postId) => {
        setSelectedPost(postId);
        setIsOpen(true);
    };

   const getActivity = () => {
    GetWithAuth("/users/activity/"+userId)
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            console.log("postun rows=",result);
            setRows(result)
        },
        (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
        }
    )
    }

    

    useEffect(() => {
        getActivity()
       
    }, [])


  return (
    <div>
      

    {isOpen? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/>: ""}

    

    {rows.map((row)=>{
     if(localStorage.getItem("userName")!=row[3]){
      return(
       < Card sx={{ margin:"10px",color:"black"}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

            
          <Button onClick={() => handleNotification(row[1])}>
                <Typography hover role="checkbox" tabIndex={-1} key={row.code} >
                  <Typography align="right">
                  {  row[3] + " senin postunu "  + row[0] }
                  </Typography>
                </Typography>
                </Button>
          </Typography>
          
        </CardContent>
        
      </Card>
      );
     }
    })}        

    
   
    </div>
  );
}

export default UserActivity;

/* 
    */