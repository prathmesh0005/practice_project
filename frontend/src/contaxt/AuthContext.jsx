
import {createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children})=>{

    const [user, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   

    useEffect(()=>{
        const check = localStorage.getItem("user")
        if(check){
            setUser(check)
        }
    },[])
 
    useEffect(()=>{
        const check = localStorage.getItem("user")
        if (check) {
            setIsLoggedIn(true)
        } 
    },[])


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
    

    // const protectedRoute = async()=>{
    //     const accessToken = localStorage.getItem("accessToken");
    //     if(!accessToken){
    //         console.log("Token not found")
    //         return null;
    //     }
    //     try {
    //         const res = await axios.get("http://localhost:3000/api/user/check", {
    //             headers: {
    //               Authorization: `Bearer ${accessToken}`,
    //             },
    //           });
    //           if (res.data.message === "TokenExpiredError") {
    //             try{
    //                 const res = await axios.post("http://localhost:3000/api/user/refresh-token")
    //                 const newToken = res.data?.access_token;
    //                 console.log(res.data?.access_token)
    //                 if(newToken){
    //                     localStorage.setItem("accessToken", newToken)
    //                     return newToken
    //                 }
    //             }
    //             catch(refreshError){
    //                 console.error("Token refresh failed:", refreshError.message);
    //                 return null;
    //             } 
    //           }
    //           return accessToken;
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return(
        <AuthContext.Provider value={{user,setUser,login,logout,isLoggedIn,setIsLoggedIn,}}>
            {children}
        </AuthContext.Provider>
    )
}