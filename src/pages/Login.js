import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import './css/login.css';
import '../pages/css/utils.css'



const Login = () => {

    const navigate = useNavigate()

    let { loginUser, user, loading } = useContext(AuthContext)
    

    const showPassword = () => {
        let checkbox = document.getElementById('chckbox')
        if(checkbox.checked){
            document.getElementById('password').type = "text";
        }else{
            document.getElementById('password').type = "password";
        }
    }
    useEffect(()=>{
        if (user) {
            navigate('/')
        }
    },[user,navigate])
    return (
        <>
            {!loading ? (
                <>
                
                    <form onSubmit={loginUser}>
                        <div className="login-box">
                            <h1 className='fadeIn my-2'>Login</h1>
                            <div className="textbox">
                                <i className="fas fa-user"></i>
                                <input type="text" name='email' placeholder="Your email" />
                            </div>

                            <div className="textbox">
                                <i className="fas fa-lock"></i>
                                <input type="password" id='password' name='password' placeholder="Your password" /> <span className='d-flex justify-content-end mt-2'><input onClick={showPassword} style = {{border: "2px solid white"}} id='chckbox' className='form-check-input' type='checkbox'></input></span>
                            </div>

                            <button type="submit" className="btn fadeIn">Sign in &#10147;</button>
                        </div>
                    </form>

                </>
            ) : (
                <>
                    <Loading />
                </>


            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>

    )
}

export default Login