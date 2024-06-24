import React, { useEffect, useRef } from 'react'
import Message from './Message'
import MessageInput from './MessageInput'
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../Seletons/MessageSkeleton';

const Messages = () => {
  const {messages, loading} = useGetMessages()
  const laMessageRef = useRef()
  const isNoMessage = messages.length === 0 
  useEffect(() => {
    setTimeout(() => {
      laMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50)
  }, [messages])
  return (
    <>
      <div className='px-4 flex-1 overflow-auto'>

        {!loading && messages.length > 0 &&
          messages.map((message) => <div key={message.id} ref={laMessageRef}><Message message={message} /></div> )
        }

        {loading && <MessageSkeleton /> }

        {!loading && messages.length === 0 && (
          <p className='text-white text-center text-lg font-semibold'>Say Hi! to start conversation</p>
        )}
      </div>
      <MessageInput />
    </>
  )
}

export default Messages
