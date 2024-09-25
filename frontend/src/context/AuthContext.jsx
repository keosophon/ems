
import React, {useState, createContext, useContext} from 'react'

const userContext = createContext()

const AuthContext = ({children}) => {
    const [user, setUser] = useState(null);
    const login = (x) => {
      setUser(x)};
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    }

  return (
    <userContext.Provider value={{user, login, logout}}>
        {children}
    </userContext.Provider>
  )
}

export const useAuthContext = () => useContext(userContext)
export default AuthContext
