import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
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

    let serverUrl = "https://eventmanagementsystem.pythonanywhere.com";
    // let serverUrl = "http://127.0.0.1:8000";

    let getUser = () => {
        const token = localStorage.getItem('authTokens');
        if (token) {
            return jwt_decode(token);
        } else {
            return null;
        }
    }

    let msgType = (c, txt) => {
        switch (c) {
            case "success":
                return toast.success(txt, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            case "error":
                return toast.error(txt, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            case "warning":
                return (toast.warn(txt, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }));
            
            default:
                return (toast(txt, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
                    );

        }
    }

    let [authTokens, setAuthToken] = useState(() => getTokens());
    let [user, setUser] = useState(() => getUser());
    let [loading, setLoading] = useState(false);


    let checkCredentials = (email, password) => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(validRegex) && password.length >= 6) {
            return true;
        } else {
            return false;
        }
    }

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let email = e.target.email.value;
            let password = e.target.password.value;
            if (!checkCredentials(email, password)) {

                return msgType("error", "Invalid credentials");

            }

            let res = await fetch(`${serverUrl}/login/`, {
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
                return msgType("success", "Logged In successfully");



            } else {
                return msgType("error", data.detail);

            }
        } catch (error) {

            return <Navigate replace to = "/" />            ;

        } finally {
            setLoading(false);
        }


    }

    let logout = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        return (msgType("success", "Logged Out successfully"), <Navigate replace to="login/" />)
    }


    let registerUser = async (e) => {
        e.preventDefault();
        try {


            setLoading(true);
            let password = e.target.password.value;
            let re_password = e.target.re_password.value;
            let email = e.target.email.value;



            if (!(checkCredentials(email, password))) {
                return msgType("error", "Either email or password is invalid");
            }
            if (!(password === re_password)) {
                return msgType("error", "Password and confirm password does not match");
            }

            let res = await fetch(`${serverUrl}/auth/users/`, {
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
            if (res.status === 201) {
                return (msgType("success", `Registered Successfully check your ${email} inbox`),<Navigate replace to="login/" />);
            } else {

                return msgType("warning", data.detail);
            }

        } catch (error) {

            return msgType("error", "Something went wrong");
        } finally {
            setLoading(false);
        }



    }


    async function validateEmail(uid, token) {

        try {
            setLoading(true);
            let res = fetch(`${serverUrl}/auth/users/activation/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uid, token })

            });

            if (res.status === 204 ) {
                
                return (msgType("success", "Email is successfully verified now you can login"),<Navigate replace to="login/" />);
            } else {

                return (msgType("error", "Something went wrong but check your email"),<Navigate replace to="login/" />);
            }
        } catch (error) {
            return (msgType("error", "Something went wrong"),<Navigate replace to='/'/>);
        } finally {
            setLoading(false);
        }

    }



    useEffect(() => {

        let time = 1000 * 60 * 50;
        
        let interval = setInterval(() => {
            if (authTokens) {
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
                        setAuthToken(null);
                        setUser(null);
                        localStorage.removeItem('authTokens');
                    }
                };
                upDateToken();

            }
        }, time);

        return () => clearInterval(interval);
    }, [authTokens, loading]);

    let contextData = {
        user: user,
        loading: loading,
        loginUser: loginUser,
        logout: logout,
        registerUser: registerUser,
        validateEmail: validateEmail,



    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

