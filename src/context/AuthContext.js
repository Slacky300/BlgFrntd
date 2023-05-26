import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { Navigate } from "react-router-dom";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    
    let getTokens = () => {
        const token = localStorage.getItem('authTokens');
        if(token){
           return JSON.parse(token)
        }else{
            return null
        }
    }

    let getUser = () => {
        const token = localStorage.getItem('authTokens');
        if(token){
            return jwt_decode(token);
        }else{
            return  null;
        }
    }

    let [authTokens, setAuthToken] = useState(() => getTokens());
    let [user, setUser] = useState(() => getUser());
    let [loading, setLoading] = useState(true);

    

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("https://eventmanagementsystem.pythonanywhere.com/login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
            });

            let data = await res.json()
            if(res.status === 200){
                setAuthToken(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens',JSON.stringify(data));
               
          
            }else{
                alert('Something went wrong')
            }
        } catch (error) {
            console.log(error);
        }


    }

    let logout = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        return <Navigate replace to = "login/" />
    }

    let upDateToken = async () => {
        let res = await fetch("https://eventmanagementsystem.pythonanywhere.com/auth/jwt/refresh/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'refresh': authTokens.refresh })
                
            });

            let data = await res.json();

            if(res.status === 200){
                setAuthToken(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
            }else{
                logout();
            }
    }

    useEffect(()=>{

        let time = 1000 * 60 *50
        let interval = setInterval(() => {
            if(authTokens){
                upDateToken();
            }
        }, time);

        return () => clearInterval(interval);
    }, [authTokens, loading])

    let contextData = {
        user: user,
        loginUser: loginUser,
        logout: logout

    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

