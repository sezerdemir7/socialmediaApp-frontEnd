import React from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';


const useStyles=makeStyles((theme)=>({
    comment:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"flex-start",
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

function Comment (props){
    const {text,userId,userName}=props;
    const clases=useStyles();

    return(
        <CardContent className={clases.comment}>
            <OutlinedInput 
            disabled
            id="outlined-adorment-amount" 
            multiline
            inputProps={{maxLength:25}}
            fullWidth
            value={text}
            startAdornment={
                <InputAdornment position="start">
                    <Link className={clases.link} to={{ pathname: '/users/' + userId }}>
                    <Avatar  aria-label="recipe" className={clases.small}>
                            {userName.charAt(0).toUpperCase()}
                           
                        </Avatar>
                         </Link>
                </InputAdornment>
            }
            >

            </OutlinedInput>

        </CardContent>

    )
}

export default Comment;