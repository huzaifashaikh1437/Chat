import React from "react";
import './call.css'
import { Avatar, Box, IconButton, Typography } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import CallEndIcon from "@material-ui/icons/CallEnd";
import { DANGER, SUCCESS } from "../../Theme/colorConstant";


const OnAnswer = () => {
  const userName =
    "Muhammad Huzaifa".toUpperCase().split(" ")[0][0] +
    "Muhammad Huzaifa".toUpperCase().split(" ")[1][0];
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around" className="onAnswerContainer">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar style={{ width: "80px", height: "80px" }}>
          <Typography variant="h5">{userName}</Typography>
        </Avatar>
        <Typography variant="h6" style={{color:"#fff"}}>Incoming Call</Typography>
      </Box>
      <Box display="flex" justifyContent="space-around" style={{width:"50%"}}>
        <IconButton style={{ backgroundColor: SUCCESS }}>
          <CallIcon  style={{color:"#fff"}}/>
        </IconButton>
        <IconButton style={{ backgroundColor: DANGER }}>
          <CallEndIcon style={{color:"#fff"}}/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default OnAnswer;
