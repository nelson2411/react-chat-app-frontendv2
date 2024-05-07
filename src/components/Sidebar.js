import React from "react"
import SidebarChatItem from "./SidebarChat"
import { ChatContext } from "../context/chat/ChatContext"
import { AuthContext } from "../auth/AuthContext"

const Sidebar = () => {
  const { chatState } = React.useContext(ChatContext)
  const { auth } = React.useContext(AuthContext)
  const { uid } = auth
  console.log("id", uid)
  console.log("users", chatState.users)
  return (
    <div className="inbox_chat">
      {/* Exclude the current user from the list */}
      {chatState.users
        .filter((user) => user.uid !== uid)
        .map((user) => (
          <SidebarChatItem key={user.uid} user={user} />
        ))}
      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  )
}

export default Sidebar
