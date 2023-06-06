import React, { useEffect, useState } from 'react'
import './css/home.css'
import { LatestPosts } from '../components/LatestPosts';
import Loading from '../components/Loading';
import '../pages/css/utils.css'



function Rhome() {

    let [posts, setPosts] = useState([]);
    let [loading, setLoading] = useState(false);

    useEffect(() => {

        async function getData() {
            try {
                setLoading(true);
                let url = `${process.env.REACT_APP_SERVER_URL}/api/getlatesposts/`;
                let res = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                let data = await res.json();
                setPosts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        }

        getData();


    }, []);

    return (

        <>
            {!loading ? (
                <>
                    <div className='container my-5'>
                        <div className='row pt-5 pb-2 d-flex justify-content-center align-items-center '>
                            <h1 className='text-center text-uppercase fadeInDown'>Absolutno</h1><br />




                            <span className='text-center fadeInDown'>The Absolute</span>
                        </div>
                        <hr></hr>
                        <div className='row d-flex justify-content-center align-items-center my-5 mx-3' >
                            <span className='h2 slideInLeft d-flex justify-content-start my-3'>Latest posts</span>
                            <LatestPosts posts={posts} />
                        </div>
                    </div>





                </>





            ) : (<Loading />)}
        </>
    )
}

export default Rhome