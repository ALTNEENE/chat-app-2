import React from 'react'
import Messages from './Messages'
import useConversation from '../../zustand/useConversation';
import NoChatSelected from './NoChaSelected';
import { AuthContext } from '../../context/useAuthContext';

function MessageContainer() {
  const {users, setUsers} = useConversation()
  return (
    <div className='w-[450px] h-[540px] flex flex-col'>
      {
        users ? 
        <>
        <div className='bg-slate-500 px-4 py-2 mb-2'>
          <span className='label-text'>To: </span>{" "}
          <span className='text-gray-900 font-bold'>{users.full_name}</span>
        </div>
        <Messages />
      </>
      :
      <>
        <NoChatSelected />
      </>
      }
    </div>
  )
}

export default MessageContainer


