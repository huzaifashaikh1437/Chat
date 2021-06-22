const initstate = {
  user: null,
  chat: {},
  Auth: null,
  groupChat: null,
  UserSearch: [],
  searchData: null,
  upDateUser: [],
  upDateMessage: [],
  updateGroup: [],
  sendMsg: [],
  userMsgs: [],
  groupMsgs: [],
  typedMsg: [],
  quote: null,
  modelState: false,
  participantModel: false,
  nameToMember: false,
  seen: false,
  groupMemberInfo: {},
  isMemberChanged: false
};
export default function Reducer(state = initstate, action) {
  switch (action.type) {
    case "Login":
      return { ...state, user: action.payload };
    case "chatting":
      return { ...state, chat: action.payload };
    case "Auth":
      return { ...state, Auth: action.payload };
    case "groupChat":
      return { ...state, groupChat: action.payload };
    case "UserSearch":
      return { ...state, UserSearch: action.payload };
    case "searchData":
      return { ...state, searchData: action.payload };
    case "upDateUser":
      return { ...state, upDateUser: action.payload };
    case "upDateMessage":
      return { ...state, upDateMessage: action.payload };
    case "updateGroup":
      return { ...state, updateGroup: action.payload };
    case "sendMsg":
      return { ...state, sendMsg: action.payload };
    case "userMsgs":
      return { ...state, userMsgs: action.payload };
    case "groupMsgs":
      return { ...state, groupMsgs: action.payload };
    case "typedMsg":
      return { ...state, typedMsg: action.payload };
    case "quote":
      return { ...state, quote: action.payload };
    case "modelState":
      return { ...state, modelState: action.payload };
    case "participantModel":
      return { ...state, participantModel: action.payload };
    case "nameToMember":
      return { ...state, nameToMember: action.payload };
    case "seen":
      return { ...state, seen: action.payload };
    case "groupMemberInfo":
      return { ...state, groupMemberInfo: action.payload };
    case "DELETE_TYPED_MESSAGE":
      const i = state.typedMsg?.findIndex(m => m.id == action.messageId);

      if(i >= 0 ) {
        state.typedMsg.splice(state.typedMsg, 1)
      }

      return state = {
        ...state,
        typedMsg: Object.assign([], state.typedMsg),
      }

    case "ADD_TYPED_MESSAGE":
      const typedMsg = [...state.typedMsg, action.message]
      return state = {
        ...state,
        typedMsg: Object.assign([], state.typedMsg),
      }
    default:
      return state;
  }
}
