import React from "react"
import "../css/chat.css"
import InboxPeople from "../components/InboxPeople"
import Messages from "../components/Messages"
import ChatSelect from "../components/ChatSelect"
import { ChatContext } from "../context/chat/ChatContext"

const ChatPage = () => {
  const { chatState } = React.useContext(ChatContext)

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />
        {chatState.activeChat ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  )
}

export default ChatPage
