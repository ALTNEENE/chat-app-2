import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import {toast} from 'react-hot-toast'
import api from '../api'
import {useAuthContext} from '../context/useAuthContext'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const {users, messages, setMessages} = useConversation()
    const reciver_id = users?.id

    useEffect(() => {
        const getMessage = async () => {
            setLoading(true)
            try {
                const res = await api.get(`/api/messages/${reciver_id}`)
                const data = res.data
                setMessages(data)
                if (res.error) throw new Error
            } catch (error) {
                setMessages([])
            } finally {
                setLoading(false)
            }
        }
        if (users?.id) getMessage();
    }, [users?.id, setMessages])
    

    return {messages, loading}
}

export default useGetMessages
