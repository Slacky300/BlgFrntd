import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [authToken, setAuthToken] = useState(null);
    let [user, setUser] = useState(null);

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("https://eventmanagementsystem.pythonanywhere.com/auth/jwt/create/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
            });

            let data = await res.json()
            if(res.status === 200){
                console.log(data)
                setAuthToken(data);
                setUser(jwt_decode(data.access));
            }else{
                alert('Something went wrong')
            }
        } catch (error) {
            console.log(error);
        }


    }


    let contextData = {
        user: user,
        loginUser: loginUser,

    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

