import React from 'react'
import {useAuthContext} from '../../context/useAuthContext'
import {jwtDecode} from 'jwt-decode'
import { extractDate } from './FormattedDate'

const Message = ({message}) => {
  const {authUser} = useAuthContext()
  const user = jwtDecode(authUser)
  const user_id = user.user_id
  const fromMe = message.reciver_profile?.id === user_id
  const chatClass = fromMe ? 'chat-start' : 'chat-end'
  const profilePic = fromMe ? message.reciver_profile.image : message.sender_profile.image
  const bubbleColor = fromMe ? '' : 'bg-sky-500'
  const formattedDate = extractDate(message.created_at)
  return (
      <div className={`chat ${chatClass}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt="" />
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleColor}`}>
            {message.message}
        </div>
        <p className='chat-footer'>{formattedDate}</p>
      </div>
  )
}

export default Message
