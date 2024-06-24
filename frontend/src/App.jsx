import {Toaster} from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { ACCESS_TOKEN } from './constants'
import ProtectedRoute from './Components/ProtectedRoute'
import { useAuthContext } from './context/useAuthContext'

function App() {
  const Logout = () => {
    const {setAuthUser} = useAuthContext()
    localStorage.clear(ACCESS_TOKEN)
    return <Navigate to={"/login"} />
  }
  return (
    <>
      <div><Toaster/></div>
      <div className="p-6 h-screen flex items-center justify-center">
        <Routes>
          <Route path='/logout' element={<Logout />} />
          <Route 
            path='/'
            element={<ProtectedRoute children={<Home />}/>}
          />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App