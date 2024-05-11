import React from "react"
import { SocketContext } from "../context/SocketContext"
import { AuthContext } from "../auth/AuthContext"
import { ChatContext } from "../context/chat/ChatContext"

const SendMesage = () => {
  const [message, setMessage] = React.useState("")
  const { socket } = React.useContext(SocketContext)
  const { auth } = React.useContext(AuthContext)
  const { chatState } = React.useContext(ChatContext)

  const onChange = ({ target: { value } }) => {
    setMessage(value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (message.length === 0) {
      return
    }

    // emit a socket event to send the message
    socket.emit("private-message", {
      from: auth.uid,
      to: chatState.activeChat,
      message,
    })
    // Dispatch an action to save the message in the chatState

    setMessage("")
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={message}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  )
}

export default SendMesage
