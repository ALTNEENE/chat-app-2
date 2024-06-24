import React from 'react'

const MessageSkeleton = () => {
  return (
    <>
        <div className='flex items-center gap-3'>
            <div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
            <div className='skeleton w-full h-5'></div>
            <div className='skeleton w-full h-5'></div>
        </div>
        <div className='flex items-center gap-3'>
            <div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
            <div className='skeleton w-full h-5'></div>
            <div className='skeleton w-full h-5'></div>
        </div>
        <div className='flex items-center gap-3'>
            <div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
            <div className='skeleton w-full h-5'></div>
            <div className='skeleton w-full h-5'></div>
        </div>
    </>
  )
}

export default MessageSkeleton
