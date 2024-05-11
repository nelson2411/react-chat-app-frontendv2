import { types } from "../../types/types"

export const chatReducer = (state, action) => {
  console.log("action", action)
  switch (action.type) {
    case types.loadedUsers:
      return {
        ...state, // the spread operator is used to copy the state
        users: [...action.payload],
      }
    case types.activeChat:
      if (state.activeChat === action.payload) return state // if the active chat is the same as the payload, return the state
      return {
        ...state,
        activeChat: action.payload, // the user that the user is talking to
        messages: [], // clean messages
      }
    case types.addMessage:
      if (
        state.activeChat === action.payload.from ||
        state.activeChat === action.payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        }
      } else {
        return state
      }
    case types.loadMessages:
      return {
        ...state,
        messages: [...action.payload],
      }
    case types.clearChatState:
      return {
        uid: "",
        activeChat: null,
        users: [],
        messages: [],
      }
    default:
      return state // state cannot be mutated
  }
}
