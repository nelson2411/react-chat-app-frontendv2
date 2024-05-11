import React from "react"
import { ChatContext } from "../context/chat/ChatContext"
import { AuthContext } from "../auth/AuthContext"
import { hourMonth } from "../helpers/hourMonth"

const OutgoingMessage = ({ msg }) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{msg.message}</p>
        <span className="time_date"> {hourMonth(msg.createdAt)}</span>
      </div>
      <div className="outgoing_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
    </div>
  )
}

export default OutgoingMessage
