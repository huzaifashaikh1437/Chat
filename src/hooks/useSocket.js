import React, { useEffect, useState, useRef } from "react";
import { getSocket, init } from "../socket";
import { useDispatch, useSelector } from "react-redux";

import { setActiveGroup, setContactUsers, setGroupMemInfo, setIsTyping, setNewGroupMessage, } from "../Redux/actions/chat";
import { getContactsUser, getUserGroups, seenGroupMessage, seenMessage } from "../api/chat";
import { setGroupMessages, setUserMessages } from "../Redux/actions/message";

import { getGroupMessages, getUserMessages } from "../api/message";
import { useHistory } from "react-router";
const useSocket = () => {
  const { auth_user, active_user, active_group,messages,groupMessages,oldMessageGroupId } = useSelector((store) => {
    return {
      auth_user: store.auth?.auth_user || {},
      active_user: store.chat?.active_user || {},
      active_group: store.chat?.active_group || {},
      messages:store.message?.userMessages || [],
      groupMessages:store.message?.groupMessages || {},
      oldMessageGroupId:store.chat.newMessage || []
    }
  });
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    init(auth_user.elsemployees_empid);
  }, [auth_user]);

  useEffect(() => {
    const socket = getSocket(auth_user.elsemployees_empid)
      socket.on("messaging", (data) => {
        const userMessage = {
          message_body: data.message_body,
          message_from: data.user_id,
          from_userpicture: data.from_userpicture,
          message_to: data.message_to,
          from_username: data.message_originalname,
          message_id: data.message_id,
          message_quotebody: data.message_quotebody,
          message_quoteid: data.message_quoteid,
          message_quoteuser: data.message_quoteuser,
          fullTime: data.fullTime,
          message_attachment:data.message_attachment || null
        };
        if (data.user_id == active_user?.elsemployees_empid) {
          const seenParams = {
            data:{
              user_id: data.user_id,
              loginuser_id: auth_user?.elsemployees_empid
            }
          }
          dispatch(seenMessage(seenParams))
          .then((res) => {
            const paramData = {
              message_to:data.user_id
             }
             const socket = getSocket(auth_user?.elsemployees_empid);
             socket.emit("isWindowOpen",paramData)
          })
          } 
          else {
            const params = {
              data: {
                loginuser_id: auth_user.elsemployees_empid,
                user_id: auth_user.elsemployees_empid,
              }
            };
             dispatch(getContactsUser(params));
          }
        const newMessage = {
          groupmessage_body: data.message_body,
          from_userpicture: data.from_userpicture,
          message_from: data.loginuser_id,
          from_username: data.from_username,
          message_id: data.message_id,
          group_id: data.group_id,
          groupmessage_quotebody: data.message_quotebody,
          groupmessage_quoteid: data.message_quoteid,
          groupmessage_quoteuser: data.message_quoteuser,
          fullTime: data.fullTime,
          groupmessage_attachment:data.groupmessage_attachment
        };  
        
        if(!data.hasOwnProperty('group_id') && userMessage.message_from === active_user?.elsemployees_empid) {
          dispatch(setUserMessages([userMessage,...messages]));
          const params = {
            data: {
              loginuser_id: auth_user.elsemployees_empid,
              user_id: auth_user.elsemployees_empid,
            }
          };
          
           dispatch(getContactsUser(params));
         } 
        else if (data.hasOwnProperty('group_id') && active_group?.group_id === data?.group_id) {
          console.log('reached to group')
          const socketParams = {
            group_id:active_group.group_id,
            user_id:auth_user?.elsemployees_empid,
          }
          const seenParams = {
            data:{
              group_id:active_group.group_id,
              user_id:auth_user?.elsemployees_empid
            }
          }
          dispatch(seenGroupMessage(seenParams))
          .then((res)=>{
            const socket = getSocket(auth_user?.elsemployees_empid);
            socket.emit("isGroupWindowOpen", socketParams);
          })
           dispatch(setGroupMessages({...groupMessages,messages:[newMessage,...groupMessages.messages]}));
            const getGroupsParams = {
              data:{
                loginuser_id: auth_user?.elsemployees_empid,
                user_id: auth_user?.elsemployees_empid,
              }
            }
            dispatch(getUserGroups(getGroupsParams));
        } else {
          const getGroupsParams = {
            data:{
              loginuser_id: auth_user?.elsemployees_empid,
              user_id: auth_user?.elsemployees_empid,
            }
          }
          dispatch(setNewGroupMessage([...oldMessageGroupId,newMessage.group_id]))
          dispatch(getUserGroups(getGroupsParams));
        }
      });
      return () => {
        socket.off('messaging')
      }
  }, [messages, groupMessages, active_user, active_group,auth_user]);

  useEffect(() => {
    const socket = getSocket(auth_user.elsemployees_empid)
      socket.on("seen", (res) => {
        const getMessageParams = {
          data: {
            from_id: auth_user?.elsemployees_empid,
            to_id: active_user?.elsemployees_empid,
            user_id: auth_user?.elsemployees_empid,
          },
        };
        dispatch(getUserMessages(getMessageParams))
      });
      return () => {
        socket.off('seen')
      }
  }, [active_user,auth_user]);

  useEffect(()=>{
    const socket = getSocket(auth_user.elsemployees_empid)
    socket.on("group-seen",(data)=>{
      const params = {
        data: {
          group_id: active_group?.group_id,
          user_id: auth_user?.elsemployees_empid,
        },
      };
      dispatch(getGroupMessages(params));
    })
    return () => {
      socket.off('group-seen')
    }
  })

  useEffect(() => {
    const socket = getSocket(auth_user.elsemployees_empid)
      socket.on("isWindowOpen", (res) => {
        console.log('widow is open')
        const params = {
          data:{
            from_id: auth_user?.elsemployees_empid,
            to_id: active_user?.elsemployees_empid,
            user_id: auth_user?.elsemployees_empid,
          }
        }
        dispatch(getUserMessages(params));
      });
      return () => {
        socket.off('isWindowOpen')
      }
  });

  useEffect(() => {
    const socket = getSocket(auth_user.elsemployees_empid)
      socket.on("isGroupWindowOpen", (res) => {
        const params = {
          data: {
            group_id: active_group?.group_id,
            user_id: auth_user?.elsemployees_empid,
          },
        };
        dispatch(getGroupMessages(params));
      });
      return () => {
        socket.off('isGroupWindowOpen')
      }
  });

  useEffect(() => {
    const socket = getSocket(auth_user.elsemployees_empid);
    socket.on('typing', (data)=>{
      dispatch(setIsTyping({
        data,
        status:true
        }));
    })
    return () => {
      socket.off('typing')
    }
  },[messages])

  useEffect(() => {
    const socket = getSocket(auth_user.elsemployees_empid);
    socket.on('leaveTyping', (data)=>{
      dispatch(setIsTyping({
        data,
        status:false
      }));
    })
    return () => {
      socket.off('leaveTyping')
    }
  })
  
  useEffect(() => {
    const socket = getSocket(auth_user.elsemployees_empid)
      socket.on("group-member", (data) => {
        dispatch(setGroupMemInfo(data));
        const userGroupParams = {
          data:{
            loginuser_id: auth_user.elsemployees_empid,
            user_id: auth_user.elsemployees_empid,
          }
        }
        dispatch(getUserGroups(userGroupParams))
        
        .then((res) => {
            for (let i = 0; i < res.data; i++) {
              if(res.data[i]?.group_id == active_group?.group_id){
                return 
              }
            }
            if (data.member_id === auth_user.elsemployees_empid) {
              console.log(`${data.member_name} has been ${data.event}`);
              dispatch(setActiveGroup({}))
              history.push('/');
            } 
          })
      });
      return () => {
        socket.off('group-member')
      }
  });
};
export default useSocket;
