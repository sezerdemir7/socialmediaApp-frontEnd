import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentFrom";
import { GetWithAuth, PostWithAuth, RefreshToken } from "../../services/HttpService";
import { DeleteWithAuth } from "../../services/HttpService";

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
        minWidth:200,
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
function Post(props) {

    const clases = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    
    const { title, text,userId,userName,postId,likes} = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentLİst, setCommentLİst] = useState([]);
    const [isLiked,setİsLiked]=useState(false);
    const isInitialMount=useRef(true);
    const [likeCount,setLikeCount]=useState(likes.length);
    const [likeId,setLikedId]=useState(null);
    
    const[onelikes,setOneLikes]=useState(likes)
    const [postList, setPostList] = useState([]);
    const [refresh,setRefresh]=useState(false);
    const [postrefresh,setPostRefresh]=useState(false);
    

    

    let disabled=localStorage.getItem("currentUser")===null? true:false;

    const setCommentRefresh=()=>{
        setRefresh(true);
    }


    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComment();
        
    };

    const postGuncelleme =() =>{
        GetWithAuth("/posts")
            .then(res => {
                if (!res.ok) { 
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (Array.isArray(result)) {
                        setPostList(result);
                    } else {
                        throw Error('Received data is not an array');
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    
    const handleLike = ()=>{
        
        setİsLiked(!isLiked);
        if(!isLiked){

            saveLike();
            getLike();
            console.log("oneLİkes===",onelikes);
            setLikeCount(likeCount+1)
            
            
        }
        else{
            deleteWith();
            setLikeCount(likeCount-1)
        }
    }



    

    const refreshComment=()=>{

        fetch("/comments?postId="+postId)
            .then(res => {
                if (!res.ok) { 
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (Array.isArray(result)) {
                        setCommentLİst(result);
                    } else {
                        throw Error('Received data is not an array');
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

            setRefresh(false);

    }

    const saveLike= ()=>{

        PostWithAuth("/likes",{
            postId:postId,
            userId:localStorage.getItem("currentUser"),
           
        })
        .then((res)=>res.json())
        .catch((err)=>console.log(err))
        console.log("OneLİkes=",onelikes)
        console.log("Lİkes=",likes)
     

    }
    const getLike=()=>{
        GetWithAuth("/likes")
        .then(res => res.json())
        .then(
            (result) => {
                
                setOneLikes(result);
                console.log("result yeni oneLikes===",result)
                
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const deleteWith=()=>{ 
       
      
        DeleteWithAuth("/likes/"+likeId)
        .catch((err) => console.log(err)) 
         //getLike();
       
    }


    
    const deleteLike = () => {
        RefreshToken()
        .then((res) => {
          if (!res.ok) {
            // logout();
          } else {
            
            DeleteWithAuth("/likes/" + likeId)
            .then((res) => {
              if (!res.ok) {
                console.log(res);
              } else {
                res.json();
              }
            })
            .catch((err) => {
              console.log(err);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      };


    useEffect(()=>{
        if(isInitialMount.current)
            isInitialMount.current=false;
        else
            refreshComment();

    },[refresh])

    const currentUser =parseInt( localStorage.getItem("currentUser"))
   


    const checLikes=()=>{
        
       
            const likeControl=onelikes.find(( like => like.userId === currentUser ));
       // console.log("OneLİkes=",onelikes)
       // console.log("likeControl=",likeControl)
        
        
      if(likeControl!=null){
        setLikedId(likeControl.id);
        //console.log("like ıd=",likeId)
      
        setİsLiked(true);
      }

       
        
        
      
       
    }

   

    useEffect(()=> {
        checLikes()
        
    },[])
   // const firstCharacter = userName.charAt(0).toUpperCase();


    return (
        <div >
            
            <Card  className={clases.centeredCard}>
                <CardHeader
                    avatar={
                        <Link className={clases.link} to={{ pathname: '/users/' + userId }}>
                        <Avatar  sx={{ background:'linear-gradient(45deg,#2196f3 30%,#21CBF3 90%)' }} aria-label="recipe">
                        {
                            userId? userName.charAt(0).toUpperCase():"N"
                        }
                            
                 
            
                           
                        </Avatar>
                         </Link>
                    }
                    
                    title={title}
                    
                />
                
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                        
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {disabled ? <IconButton onClick={handleLike} aria-label="add to favorites" >
                        <FavoriteIcon style = {isLiked ? {color:"#1DA1F2"} : null}/> </IconButton>:
                        <IconButton onClick={handleLike} aria-label="add to favorites" >
                            <FavoriteIcon style = {isLiked ? {color:"#1DA1F2"} : null}/> 
                        
                    </IconButton>}
                    {likeCount}
                    
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        
                           
                        
                    <InsertCommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed className={clases.container}>
                        {error?"eror":
                        isLoaded ?commentLİst.map(comment=>(
                            <Comment userId={comment.userId} userName={comment.userName} text={comment.text}></Comment>
                        )):"Loading"}
                        {disabled? "": <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={postId} setCommentRefresh={setCommentRefresh}>  </CommentForm>}
                       
                    </Container>
                </Collapse>
            </Card>

        </div>
    )
}
export default Post;