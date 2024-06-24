import { useState } from "react";
import {toast} from 'react-hot-toast'
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import api from '../api'
import useSignup from "../hooks/useSignup";

const Signup = () => {

    const {loading, signup} = useSignup()

    const [formData, setFormdata] = useState({
        email: "",
        username: "",
        password: "",
        password2: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        signup(formData)
    }

    return(
        <>
            <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
                <div className="w-full p-6 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
                    <h1 className="text-3xl font-semibold text-center text-color-gray-300">SignUp|
                        <span className="text-blue-500">ChatApp</span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input type="email" value={formData.email} onChange={(e) => setFormdata({ ...formData, email: e.target.value })} name="email" placeholder="Enter Email" className="w-full input input-bordered h-10" />
                            <label className="label p-2">
                                <span className="text-base label-text">Username</span>
                            </label>
                            <input type="text" value={formData.username} onChange={(e) => setFormdata({ ...formData, username: e.target.value })} name="username" placeholder="Enter a username" className="w-full input input-bordered h-10" />
                            <label className="label p-2">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input type="password" value={formData.password} onChange={(e) => setFormdata({ ...formData, password: e.target.value })} name="password" placeholder="Enter Password" className="w-full input input-bordered h-10" />
                            <label className="label p-2">
                                <span className="text-base label-text">Confirm Password</span>
                            </label>
                            <input type="password" value={formData.password2} onChange={(e) => setFormdata({ ...formData, password2: e.target.value })} name="repassword" placeholder="Repeat your password" className="w-full input input-bordered h-10" />
                            <a href="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Already have an account?</a>
                            <div className="mt-2 flex items-center justify-center">
                                <button type="submit" className="btn btn-block btn-sm mt-2" disabled={loading} >
                                {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;