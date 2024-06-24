import React, { useState } from 'react'
import {IoSearchSharp} from 'react-icons/io5'
import useConversation from '../../zustand/useConversation'
import useGetUsers from '../../hooks/useGetUsers'

function SearchBar() {
  const [search, setSearch] = useState("")
  const {setUsers} = useConversation()
  const {users} = useGetUsers()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!search) return

    const conversation = users.find((c) => c.full_name.toLowerCase().includes(search.toLowerCase))
    if (conversation) setUsers(conversation)
    setSearch("")
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input className="input input-bordered rounded-full" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className='btn btn-circle bg-sky-500 text-white font-bold text-lg'>{<IoSearchSharp />}</button>
    </form>
  )
}

export default SearchBar
