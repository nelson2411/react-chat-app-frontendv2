import React from "react"
import SendMessage from "./SendMessage"
import IncomingMessage from "./IncomingMessage"
import OutgoingMessage from "./OutgoingMessage"
import { ChatContext } from "../context/chat/ChatContext"
import { AuthContext } from "../auth/AuthContext"

const Messages = () => {
  const { chatState } = React.useContext(ChatContext)
  const { auth } = React.useContext(AuthContext)
  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}
      <div id="messages" className="msg_history">
        {chatState.messages.map((msg, i) => {
          if (msg.to === auth.uid) {
            return <IncomingMessage key={i} msg={msg} />
          } else {
            return <OutgoingMessage key={i} msg={msg} />
          }
        })}
      </div>
      {/* <!-- Historia Fin --> */}
      <SendMessage />
    </div>
  )
}

export default Messages
