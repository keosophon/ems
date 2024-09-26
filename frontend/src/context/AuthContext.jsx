
import React, {useState, createContext, useContext, useEffect} from 'react'
//import {useNavigate} from 'react-router-dom'

const userContext = createContext()

const AuthContext = ({children}) => {
    const [user, setUser] = useState(null);
    //const navigate = useNavigate();

    const verifyUser = async () => {
      try {
        const res = await axios.get("https://localhost:5000/api/auth/verify", {
          headers: { Authorization: token },
        });
        if (res.data.success) setUser(res.data.user);
      } catch (error) {
        console.error("error", error);
        //navigate("/login");
      }
    };
  
    useEffect(() => {
      verifyUser();
    }, []);

    const login = (user) => {
      setUser(user)};
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
