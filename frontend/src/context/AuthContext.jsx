
import React, {useState, createContext, useContext, useEffect} from 'react'

const userContext = createContext()

const AuthContext = ({children}) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(null);

    useEffect(() => {
      const verifyUser = async () => {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const response = await axios.get("https://localhost:5000/api/auth/verify", {
            headers: { "Authorization": `Bearer ${token }`}})
            if (response.data.success) {
              setUser(response.data.user);
            }
          }
          else {
            setUser(null);
          }
        } catch (error) {
          if (error.response && !error.response.data.error) {
            setUser(null);
          }
        } finally {
          setLoading(false);
        }
      };
      verifyUser();
    }, []);

    const login = (user) => {
      setUser(user)};
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    }

  return (
    <userContext.Provider value={{user, login, logout,loading}}>
        {children}
    </userContext.Provider>
  )
}

export const useAuthContext = () => useContext(userContext)
export default AuthContext
