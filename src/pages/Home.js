import React from 'react'
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import AuthContext from '../context/AuthContext';
const Home = () => {
    let {user} = useContext(AuthContext);

    return (
        <>
            <header><Navbar /></header>
            <div className='container mt-5'>
                {user && <h1>Hello {user.user_id}</h1>}
                <Outlet />
            </div>
        </>
    )
}

export default Home