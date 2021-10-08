import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Select from '@mui/material/Select';
import { Typography, Box, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal';
const useStyle = makeStyles({
  attachmentHeader: {
    height: "10vh",
    padding: "0px 5px"
  },
  attachments: {
    height: "90vh",
    overflowY: "scroll",
    padding: "0px 5px"
  }
})
function Attachments({ gallery, setGallery }) {
  const classes = useStyle();
  const [attachmentType, setAttachmentType] = useState("all");
  const [attachSrc, setAttachSrc] = useState("");
  const [open, setOpen] = useState(false);
  const { auth_user, active_user, attachments } = useSelector((store) => {
    return {
      auth_user: store.auth?.auth_user || {},
      active_user: store.chat?.active_user || {},
      attachments: store.message?.attachments || ""
    };
  });
  const openImage = (e) => {
    setOpen(true);
    setAttachSrc(e.target.currentSrc);
  }
  const handleClose = ()=> setOpen(false);
  const DropDown = () => {
    const handleChange = (e) => {
      setAttachmentType(e.target.value);
    }
    return (
      <FormControl sx={{ minWidth: 80 }}>
        <Select
          value={attachmentType}
          onChange={handleChange}
          displayEmpty
          variant="filled"
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="media">Media</MenuItem>
          <MenuItem value="files">Files</MenuItem>
        </Select>
      </FormControl>
    )
  }
  const AttachmentsHeader = () => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.attachmentHeader}>
        <IconButton onClick={() => { setGallery(false) }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5">Gallery</Typography>
        <DropDown />
      </Box>
    )
  }
  const AttachmentSkeleton = ()=>{
    return (
      [1,2,3,4,5].map((ele)=>{
        return (
          <Stack style={{margin:"5px 0px"}}><Skeleton variant="rectangular" width={300} height={118} key={ele}/></Stack>
        )
      })
    )
  }
  const Attachments = () => {
    return attachments.split(",").map((attachment, id) => {
      const DownloadButton = () => {
        return (
          <Button variant="outlined" size="small" color={"primary"}>
            <a
              href={`/api/bwccrm/storage/app/public/chat_attachments/${attachment}`}
              download={attachment}
              className="anchorText"
            >
              Download
            </a>
          </Button>
        );
      };
      const splitAttachment = attachment.split(".");
      const attachmentType = splitAttachment[splitAttachment.length - 1];
      if (
        attachmentType.toLowerCase() === "jpg" ||
        attachmentType.toLowerCase() === "gif" ||
        attachmentType.toLowerCase() === "png" ||
        attachmentType.toLowerCase() === "jpeg"
      ) {
        return (
          <div className="attachView" key={id}>
            <img
              onClick={(e) => {
                openImage(e);
              }}
              height="auto"
              width="100%"
              src={`/api/bwccrm/storage/app/public/chat_attachments/${attachment}`}
              alt="attachment"
            />
          </div>
        );
      }
      if (
        attachmentType.toLowerCase() === "mp4" ||
        attachmentType.toLowerCase() === "mkv" ||
        attachmentType.toLowerCase() === "wmv" ||
        attachmentType.toLowerCase() === "flv"
      ) {
        return (
          <div className="attachView" key={id}>
            <video
              height="auto"
              width="100%"
              src={`/api/bwccrm/storage/app/public/chat_attachments/${attachment}`}
              alt="attachments"
              controls
            />
          </div>
        );
      }
      else {
        const fileName = attachment;
        return (
          <div className="attachView" key={id}>
            <div className="file" style={{ maxWidth: "100%" }}>
              <FileCopyIcon />
              <Typography variant="caption">{fileName}</Typography>
              <DownloadButton />
            </div>
          </div>
        );
      }
    });
  };
  const modalStyle = {
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
  const imgStyle = {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    height: "auto",
  };
  return (
    <Box style={{ width: gallery ? "400px" : "0px", transition: "0.2s" }}>
      <AttachmentsHeader />
      <Box className={classes.attachments}>
        {attachments.length > 0 ? <Attachments /> : <AttachmentSkeleton/>}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={modalStyle}
        >
        <div>
          <img src={attachSrc} style={imgStyle}/>
        </div>
      </Modal>
    </Box>
  )
}

export default Attachments
