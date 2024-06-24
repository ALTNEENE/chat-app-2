import React, { useState } from 'react'
import {BsSend} from 'react-icons/bs'
import useConversation from '../../zustand/useConversation';
import useSendMessage from '../../hooks/useSendMessage';
import useGetMessages from '../../hooks/useGetMessages';

const MessageInput = () => {
    const {selectedConversation} = useConversation()
    const [myMessage, setMessage] = useState("")
    const {loading, sendMessage} = useSendMessage()
    const {getMessages} = useGetMessages()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()

        //data.append("user", selectedConversation.user)
        //data.append("sender", selectedConversation.sender)
        //data.append("reciver", selectedConversation.reciver)
        data.append("message", myMessage)
        if (!myMessage) return
        await sendMessage(data)
        setMessage("")
    }

  return (
    
        <form action="" className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
            <input type="text" 
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white mt-6'
                placeholder='Send a message'
                value={myMessage}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit' className='absolute inset-y-0 end-0 flex justify-center items-center p-3'>
                <BsSend />
            </button>
            </div>
        </form>
  )
}

export default MessageInput
