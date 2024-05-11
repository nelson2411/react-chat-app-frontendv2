import React from "react"
import { ChatContext } from "../context/chat/ChatContext"
import { types } from "../types/types"
import { fetchWithToken } from "../helpers/fetch"
import { scrollToBottom } from "../helpers/scrollToBottom"

const SidebarChatItem = ({ user }) => {
  const { chatState, dispatch } = React.useContext(ChatContext)
  const { activeChat } = chatState

  const onClick = async () => {
    dispatch({
      type: types.activeChat,
      payload: user.uid,
    })

    // Load chat messages
    const resp = await fetchWithToken(`messages/${user.uid}`)
    dispatch({
      type: types.loadMessages,
      payload: resp.messages,
    })
    scrollToBottom("messages")
  }
  return (
    <div
      className={`chat_list ${activeChat === user.uid && "active_chat"}`}
      onClick={onClick}
    >
      {/* <!-- active_chat --> */}
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://atg-prod-scalar.s3.amazonaws.com/studentpower/media/user%20avatar.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{user.name} </h5>
          {user.online ? (
            <span className="text-success">Online 🟢</span>
          ) : (
            <span className="text-danger">Offline 🔴</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default SidebarChatItem
