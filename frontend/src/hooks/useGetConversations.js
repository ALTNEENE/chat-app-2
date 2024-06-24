import React, {useState, useEffect} from 'react'
import api from '../api'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useGetConversations = () => {
  const {users, selectedConversations, setSelectedConversations} = useConversation()

    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await api.get(`/api/conv/`)
                console.log(res.data)
                setSelectedConversations(res.data)
            } catch (error) {
                toast.error(error.message)
            }
        }
        getConversation()
    }, [])

  return {selectedConversations}
}

export default useGetConversations
