import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from "react-router-dom";
import './login.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Login = () => {

    let { loginUser, user, loading } = useContext(AuthContext)
    if (user) {
        return <Navigate replace to="/" />
    }


    return (
        <>
            {!loading ? (
                <>
                    <div className='container my-5'>
                        <form onSubmit={loginUser}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" name='email' required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' required />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
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