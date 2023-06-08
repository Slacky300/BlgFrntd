import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import './css/navbar.css'
export const Navbar = () => {

    let { user, logout } = useContext(AuthContext)
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" id='logoName'>Absolutno</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto" >
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {!user ? (

                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </>


                            ) : (
                                <>
                                    {user.email === "riyaz.211834101@vcet.edu.in"?(<li className="nav-item">
                                        <Link className="nav-link" to="/admin_blog">Admin</Link>
                                    </li>):(<></>)}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/posts">Blogs</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/about">About us</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link' onClick={logout}>Logout</Link>
                                    </li>
                                </>
                            )}




                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
