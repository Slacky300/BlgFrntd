import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import { useNavigate } from "react-router-dom";
import './css/login.css'
import '../pages/css/utils.css'

export const Register = () => {

    let { loading, registerUser, user } = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const showPassword = () => {
        let checkbox = document.getElementById('chckbox')
        if (checkbox.checked) {
            document.getElementById('password').type = "text";
        } else {
            document.getElementById('password').type = "password";
        }
    }

    return (
        <>

            {!loading ?
                (
                    <>
                        <form onSubmit={registerUser} className='my-5'>
                            <div className="login-box container my-3">
                                
                                    <h1 className='fadeIn my-2'>Register</h1>

                                    <div className="textbox">
                                        <i className="fas fa-user"></i>
                                        <input type="text" name='nameU' placeholder="Your name" />
                                    </div>

                                    <div className="textbox">

                                        <input type="email" name='email' placeholder="Your email" />
                                    </div>

                                    <div className="textbox">

                                        <input type="password" name='password' id='password' placeholder="Your password" /> <span className='d-flex justify-content-end mt-2'><input onClick={showPassword} style={{ border: "2px solid white" }} id='chckbox' className='form-check-input' type='checkbox'></input></span>
                                    </div>

                                    <div className="textbox">

                                        <input type="text" name='re_password' placeholder="Confirm password" />
                                    </div>

                                    <input type="submit" className="btn fadeIn" value="Sign up &#10147;" />
                         

                            </div>
                        </form>

                    </>
                ) :
                (
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
