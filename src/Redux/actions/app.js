import {
  SET_USER_SEARCH_RESULT,
  SET_SEARCH_TEXT,
  SET_EDIT_GROUP_MODEL_STATE,
  SET_EDIT_GROUP_NAME_TO_MEMBER_STATE,
  SET_PARTICIPANT_MODEL_STATE,
  SET_QUOTE,
  SET_SEEN,
  SET_NIGHT_MODE,
  SET_ADMIN_PANEL,
<<<<<<< HEAD
  SET_SIDE_BAR,
=======
  SET_RECEIVING_DATA,
  SET_CALLING_DATA,
  SET_REMOTE_STREAM,
  SET_LOCAL_STREAM
>>>>>>> c8d5cb4b02aa80a2f0294677cac1cd3ad95f780b
} from "../constant/app";

export const setUserSearchResult = (userSearch) => {
  return {
    type: SET_USER_SEARCH_RESULT,
    userSearch,
  };
};

export const setSearchText = (searchText) => {
  return {
    type: SET_SEARCH_TEXT,
    searchText,
  };
};

export const setEditGroupModelState = (modelState) => {
  return {
    type: SET_EDIT_GROUP_MODEL_STATE,
    modelState,
  };
};

export const setParticipantModelState = (modelState) => {
  return {
    type: SET_PARTICIPANT_MODEL_STATE,
    modelState,
  };
};

export const setEditGroupNameToMemberModelState = (modelState) => {
  return {
    type: SET_EDIT_GROUP_NAME_TO_MEMBER_STATE,
    modelState,
  };
};

export const setQuote = (quoteData) => {
  return {
    type: SET_QUOTE,
    quoteData,
  };
};

export const setSeen = (seen) => {
  return {
    type: SET_SEEN,
    seen,
  };
};

export const setNightMode = (mode) => {
  return {
    type: SET_NIGHT_MODE,
    mode,
  };
};
export const setAdminPanel = (setAdmin) => {
  return {
    type: SET_ADMIN_PANEL,
    setAdmin,
  };
};
<<<<<<< HEAD
export const setSideBar = (state) => {
  return {
    type: SET_SIDE_BAR,
    state,
=======
export const setCallerInfo = (callerInfo) => {
  return {
    type: SET_RECEIVING_DATA,
    callerInfo,
  };
};
export const setCallingInfo = (callingInfo) => {
  return {
    type: SET_CALLING_DATA,
    callingInfo,
  };
};
export const setRemoteStream = (remoteStream) => {
  return {
    type: SET_REMOTE_STREAM,
    remoteStream,
  };
};
export const setLocalStream = (localStream) => {
  return {
    type: SET_LOCAL_STREAM,
    localStream,
>>>>>>> c8d5cb4b02aa80a2f0294677cac1cd3ad95f780b
  };
};
