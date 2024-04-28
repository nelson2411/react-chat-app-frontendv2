import React from "react"
import { useSocket } from "../hooks/useSocket"
import { AuthContext } from "../auth/AuthContext"
export const SocketContext = React.createContext()

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:8080"
  )
  const { auth } = React.useContext(AuthContext)

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

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  )
}
