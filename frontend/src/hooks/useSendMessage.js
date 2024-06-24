import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import api from '../api'
import useConversation from '../zustand/useConversation'
import useGetMessages from './useGetMessages'

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const {users, messages, setMessages} = useConversation()
  const reciver_id = users?.id
  const sendMessage = async (fomrData) => {
    setLoading(true)
    try {
        const res = await api.post(`/api/send-message/${reciver_id}`, fomrData)
        const data = res.data
        setMessages([...messages,data])

    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  return {loading, sendMessage}
}

export default useSendMessage
