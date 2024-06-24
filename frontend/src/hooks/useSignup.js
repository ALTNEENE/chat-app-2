import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'

function useSignup() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const signup = async ({email, username, password, password2}) => {
    const successful = handelInputerrors({email, username, password, password2});
    if(!successful) return;
        setLoading(true)
        try {
            const res = await api.post("/api/user/register/", {email, username, password, password2})
            toast.success("Account created Sucessfully !")
            navigate("/login")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return {loading, signup}
}

const handelInputerrors = ({email, username, password, password2}) => {
    if(!email || !username || !password || !password2) {
        return toast.error("Please fill all fields")
        return false;
    }

    if(password != password2) {
        return toast.error("Password did't match !!")
        return false;
    }

    return true
}


export default useSignup
