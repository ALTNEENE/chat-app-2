import React from 'react'
import Conversations from './Conversations'
import SearchBar from './SearchBar'
import LogoutButton from './LogoutButton'

function SideBar() {
  return (
      <div className=' border-r border-slate-500 p-4 flex flex-col'>
        <SearchBar />
        <div className='divider px-3' />
        <Conversations />
        <LogoutButton />
      </div>
  )
}

export default SideBar
