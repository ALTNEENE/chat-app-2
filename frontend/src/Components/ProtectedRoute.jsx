import api from '../api'
import {jwtDecode} from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants'

const ProtectedRoute = ({children}) => {
    const [Authenticated, setAuthenticated] = useState(null)
    useEffect(() => {
        auth()
    },[])
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setAuthenticated(false)
            return
        }

        const decode = jwtDecode(token)
        const expairation = decode.exp
        const now = Date.now() / 1000
        if (expairation < now) {
            await refreshToken()
        } else {
            setAuthenticated(true)
        }
    }

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("api/refresh/", {
                refresh: refreshToken,
            })
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.refresh)
                setAuthenticated(true)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setAuthenticated(false)
        }

    }
    if (Authenticated === null) return <span className="loading loading-spinner loading-lg"></span>

    return Authenticated ? children : <Navigate to={"/login"} />
}

export default ProtectedRoute
