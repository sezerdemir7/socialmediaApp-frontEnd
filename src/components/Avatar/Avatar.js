import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ListItemButton, ListItemAvatar, Radio, List, ListItem, ListItemText } from "@mui/material";
import { Avatar as MuiAvatar } from "@mui/material";
import { Image } from "@mui/icons-material";
import { PutWithAuth } from "../../services/HttpService";

function Avatar(props) {
    const {avatarId,userId,userName}=props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(avatarId);

  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
    saveAvatar();
} 

  const handleRadioChange = (event) => {
    setSelectedValue(Number(event.target.value));
  };


  const saveAvatar= ()=>{
    PutWithAuth("/users/"+localStorage.getItem("currentUser"),{
      avatar:selectedValue,
      userName:userName,
      
    })
    .then(res=>res.json())
    .catch((err)=>console.log(err))
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345, margin: 10 }}>
        <CardMedia
       component="img"
       alt="User Avatar"
       image={`/avatars/avatar${selectedValue}.png`}
       title="User Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User info
          </Typography>
        </CardContent>
        <CardActions>
          {localStorage.getItem("currentUser")==userId ? <Button size="small" onClick={handleOpen}>Change Avatar</Button>:""}
          
        </CardActions>
      </Card>

    <Modal style={{display:"flex",maxWidth:200}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {[1, 2, 3, 4, 5, 6].map((value) => {
            const labelId = `radio-list-secondary-label-${value}`;
            return (
              <ListItem
                key={value}
                disablePadding
              >
                <ListItemButton>
                <ListItemAvatar>
                     <MuiAvatar
                     alt={`Avatar n°${value + 1}`}
                    src={`/avatars/avatar${value}.png`}
                    />
            </ListItemAvatar>
                  <ListItemText id={labelId} primary={` Avatar ${value }`} />
                  <Radio
                    edge="end"
                    onChange={handleRadioChange}
                    value={value}
                    checked={selectedValue === value}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Modal>
    </div>
  );
}

export default Avatar;
