import React from "react"
import AppRouter from "./router/AppRouter"
import { AuthProvider } from "./auth/AuthContext"
import { ChatProvider } from "./context/chat/ChatContext"
import { SocketProvider } from "./context/SocketContext"

const ChatApp = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  )
}

export default ChatApp
