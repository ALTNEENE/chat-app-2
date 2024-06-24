import React, { useState } from 'react'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function useLogin() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const login = async ({email, password}) => {
        setLoading(true)
        try {
            const res = await api.post("/api/token/", {email, password})
            if(res.status == 200){
                toast.success("Logged in Successfully !")
                localStorage.setItem(ACCESS_TOKEN, String(res.data.access))
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            }
            navigate("/")
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }
    return {loading, login}
}

export default useLogin
