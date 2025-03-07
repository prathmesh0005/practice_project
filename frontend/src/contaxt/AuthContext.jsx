import {createContext, useState } from "react";
//import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children})=>{

    const [user, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    //Function to ligin user
    const login = (userData, accessToken) => {
        setUser(userData);
       
        localStorage.setItem("accessToken",accessToken);
        localStorage.setItem("user", JSON.stringify(userData));
    }

    //check user
    // useEffect(() => {
    //     console.log("Updated user state:", user); 
    // }, [user]);

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user")
    }

    return(
        <AuthContext.Provider value={{user,setUser,login,logout,isLoggedIn,setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}