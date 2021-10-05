import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import Modal from "react-modal";
import "./addChat.css";
import GroupListContainer from "./GroupListContainer/GroupListContainer";
import GroupName from "./GroupName/GroupName";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { useSelector } from "react-redux";
import { DARKMAIN, SECONDARYDARK, WHITE } from "../../../Theme/colorConstant";
function AddChat() {
  const [groupModelName, setGroupModelName] = useState(false);
  const [groupModelListContaier, setgroupModelListContaier] = useState(false);
  const [passGroupName, setPassGroupName] = useState("");
  const [passGroupPicture, setPassGroupPicture] = useState("");
  const { isNightMode } = useSelector((store) => {
    return {
      
      isNightMode:store.app.mode || false
    }
  });
  return (
    <>
      <div className="add__chat">
        <IconButton
          style={{color:isNightMode ? "#fff": "#267396",border: isNightMode ?"1px solid #fff" : `1px solid ${SECONDARYDARK}`,background: isNightMode ? DARKMAIN:WHITE}}
          className="addChat__btn"
          onClick={() => {
            setGroupModelName(true);
          }}
        > 
          <GroupAddIcon style={{color:isNightMode ? "#fff": "#267396"}}/>
          Create New Group
        </IconButton>
      </div>

      <Modal
        isOpen={groupModelName}
        onRequestClose={() => {
          setGroupModelName(false);
        }}
        className="groupModel"
      >
        <GroupName
          setGroupModelName={setGroupModelName}
          setgroupModelListContaier={setgroupModelListContaier}
          setPassGroupName={setPassGroupName}
          setPassGroupPicture={setPassGroupPicture}
          passGroupPicture={passGroupPicture}
        />
      </Modal>

      <Modal
        isOpen={groupModelListContaier}
        onRequestClose={() => {
          setgroupModelListContaier(false);
        }}
        className="groupModel"
      >
        <GroupListContainer
          setgroupModelListContaier={setgroupModelListContaier}
          setGroupModelName={setGroupModelName}
          passGroupName={passGroupName}
          passGroupPicture={passGroupPicture}
        />
      </Modal>
    </>
  );
}

export default React.memo(AddChat);
