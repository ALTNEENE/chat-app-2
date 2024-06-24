import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import {Link} from 'react-router-dom'

const LogoutButton = () => {
  return (
    <Link to={"/logout"} className='mt-auto '>
      <BiLogOut className='w-6 h-6 text-white cursor-pointer' />
    </Link>
  )
}

export default LogoutButton
