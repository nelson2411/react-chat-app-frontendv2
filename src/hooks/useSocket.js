import React from "react"
import io from "socket.io-client"

export const useSocket = (serverPath) => {
  const [socket, setSocket] = React.useState(null)
  const [online, setOnline] = React.useState(false)

  const connectSocket = React.useCallback(() => {
    const token = localStorage.getItem("token")
    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true, // This is important to avoid reconnection issues
      query: {
        "x-token": token,
      },
    })
    setSocket(socketTemp)
  }, [serverPath])

  const disconnectSocket = React.useCallback(() => {
    socket?.disconnect()
  }, [socket])

  React.useEffect(() => {
    setOnline(socket?.connected)
  }, [socket])

  React.useEffect(() => {
    socket?.on("connect", () => {
      setOnline(true)
    })
  }, [socket])

  React.useEffect(() => {
    socket?.on("disconnect", () => {
      setOnline(false)
    })
  }, [socket])

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  }
}
