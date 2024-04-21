import React from "react"
import SendMesage from "./SendMesage"
import IncomingMessage from "./IncomingMessage"
import OutgoingMessage from "./OutgoingMessage"

const Messages = () => {
  const messages = [1, 2, 3, 4, 5]
  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}
      <div className="msg_history">
        {messages.map((msg) =>
          msg % 2 ? ( // If message is odd, then incoming message, else outgoing message
            <IncomingMessage key={msg} />
          ) : (
            <OutgoingMessage key={msg} />
          )
        )}
        {/* <IncomingMessage />
        <OutgoingMessage /> */}
      </div>
      {/* <!-- Historia Fin --> */}
      <SendMesage />
    </div>
  )
}

export default Messages
