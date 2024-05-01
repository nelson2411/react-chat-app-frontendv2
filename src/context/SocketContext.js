import React from "react"
import { types } from "../types/types"
import { useSocket } from "../hooks/useSocket"
import { AuthContext } from "../auth/AuthContext"
import { ChatContext } from "./chat/ChatContext"

export const SocketContext = React.createContext()

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:8080"
  )
  const { auth } = React.useContext(AuthContext)
  const { dispatch } = React.useContext(ChatContext)

  React.useEffect(() => {
    if (auth.logged) {
      connectSocket()
    }
  }, [auth, connectSocket])

  React.useEffect(() => {
    if (!auth.logged) {
      disconnectSocket()
    }
  }, [auth, disconnectSocket])

  // listen to changes in the socket and update the context
  React.useEffect(() => {
    socket?.on("list-users", (users) => {
      dispatch({
        type: types.loadedUsers,
        payload: users,
      })
    })
  }, [socket, dispatch]) // dispatch has been added because it is a dependency of the effect

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  )
}
