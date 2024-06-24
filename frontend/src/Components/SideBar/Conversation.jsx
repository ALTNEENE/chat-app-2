import React from 'react'
import useConversation from '../../zustand/useConversation';

const Conversation = ({user, laIDX}) => {
  const {users, setUsers} = useConversation()
  const isSelected = users?.id === user.id;
  return (
    <>
    <div onClick={() => {setUsers(user)}} className={`flex gap-2 items-center ${isSelected ? 'bg-sky-500' : ""} hover:bg-sky-500 rounded p-2 py-1 hover:cursor-pointer`}>
      <div className='avatar online'>
        <div className='w-12 rounded-full'>
          <img src={user.image} alt="" />
        </div>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
          <p className='font-bold text-gray-200'>{user.full_name}</p>
        </div>
      </div>
    </div>
    {laIDX ? '' : <div className='divider my-0 py-0 h-1' />}
    </>
  )

  
}


export default Conversation
