import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {loading, login} = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login({email, password})
    }

    return(
        <>
            <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
                <div className="w-full p-6 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
                    <h1 className="text-3xl font-semibold text-center text-color-gray-300">Login|
                        <span className="text-blue-500">ChatApp</span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="username" placeholder="Enter a username" className="w-full input input-bordered h-10" />
                            <label className="label p-2">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Enter Password" className="w-full input input-bordered h-10" />
                            <a href="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Don't have an account?</a>
                            <div className="mt-2 flex items-center justify-center">
                                <button type="submit" className="btn btn-block btn-sm mt-2" disabled={loading} >
                                {loading ? <span className="loading loading-spinner"></span> : 'Login'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
    
}

export default Login;