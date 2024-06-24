import React, { useEffect, useState } from 'react'
import api from '../api'
import {useAuthContext} from '../context/useAuthContext'
import {jwtDecode} from 'jwt-decode'

const useGetUsers = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const {authUser} = useAuthContext()

    useEffect(() => {
        const getUsers = async () => {
            const decode = jwtDecode(authUser)
            const user_id = decode.user_id
            setLoading(true)
            try {
                const res = await api.get(`/api/profile/${user_id}`)
                setUsers(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    }, [])

    return {loading, users}
}

export default useGetUsers
