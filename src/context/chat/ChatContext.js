import React from "react"
import { chatReducer } from "./chatReducer"

export const ChatContext = React.createContext()

const initialState = {
  uid: null,
  activeChat: null,
  users: [], // all users from database
  messages: [], // selected chat
}

export const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = React.useReducer(chatReducer, initialState)
  return (
    <ChatContext.Provider
      value={{
        chatState,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
