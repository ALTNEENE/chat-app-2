import { useContext, useState } from "react"
import { createContext } from "react"
import {ACCESS_TOKEN} from "../constants"

export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const  AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(localStorage.getItem(ACCESS_TOKEN));

    return <AuthContext.Provider value={{authUser, setAuthUser}}>{children}</AuthContext.Provider>
}
