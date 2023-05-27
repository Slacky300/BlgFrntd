import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { Navigate } from "react-router-dom";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let getTokens = () => {
        const token = localStorage.getItem('authTokens');
        if (token) {
            return JSON.parse(token)
        } else {
            return null
        }
    }

    let getUser = () => {
        const token = localStorage.getItem('authTokens');
        if (token) {
            return jwt_decode(token);
        } else {
            return null;
        }
    }

    let [authTokens, setAuthToken] = useState(() => getTokens());
    let [user, setUser] = useState(() => getUser());
    let [loading, setLoading] = useState(false);



    let loginUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await fetch("https://eventmanagementsystem.pythonanywhere.com/login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
            });

            let data = await res.json()
            if (res.status === 200) {
                setAuthToken(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                setLoading(false);


            } else {
                alert('Something went wrong')
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }


    }

    let logout = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        return <Navigate replace to="login/" />
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

        if (res.status === 200) {
            setAuthToken(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            logout();
        }
    }

    let registerUser = async (e) => {
        e.preventDefault();
        try {


            setLoading(true);
            let res = await fetch("https://eventmanagementsystem.pythonanywhere.com/auth/users/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': e.target.email.value,
                    'name': e.target.nameU.value,
                    'password': e.target.password.value,
                    're_password': e.target.re_password.value
                })
            });

            let data = await res.json();
            if (res.status === 200) {
                console.log("User created");
                console.log(data);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }



    }


    // let getBlogs = async () => {
    //     try {
    //         let res = await fetch("https://eventmanagementsystem.pythonanywhere.com/posts/",{
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },

    //         });

    //         let data = res.json();
    //         console.log(data);

    //         console.log(res.status);
    //     } catch (error) {
    //         console.log(error)
    //     }



    // }

    useEffect(() => {

        let time = 1000 * 60 * 50
        let interval = setInterval(() => {
            if (authTokens) {
                upDateToken();
            }
        }, time);

        return () => clearInterval(interval);
    }, [authTokens, loading])

    let contextData = {
        user: user,
        loading: loading,
        loginUser: loginUser,
        logout: logout,
        registerUser: registerUser,


    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

