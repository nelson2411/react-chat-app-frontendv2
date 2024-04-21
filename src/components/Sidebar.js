import React from "react"
import SidebarChatItem from "./SidebarChat"

const Sidebar = () => {
  const chats = [1, 2, 3, 4, 5]
  return (
    <div className="inbox_chat">
      {chats.map((chat) => (
        <SidebarChatItem key={chat} />
      ))}
      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  )
}

export default Sidebar
