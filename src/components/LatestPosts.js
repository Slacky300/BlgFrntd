import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './css/latestPost.css'



export const LatestPosts = (props) => {

    let { user } = useContext(AuthContext);

    return (

        <>


            {props.posts.map((posts) => {
                const date = new Date(posts.uploadedOn);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();

                const withSlashes = [day, month, year].join('/');
                return (
                    <>

                        
                                <div className="col-md-4  col-lg-4 d-flex justify-content-center align-items-center" key={posts.slug}>
                                    <div className="card slideInUp"  style = {{maxWidth: "288px", maxHeight: "366px"}}>
                                        <img src={`${process.env.REACT_APP_SERVER_URL}/${posts.img}`} style={{maxWidth: "30em", maxHeight: "8em"}} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{posts.title.slice(0,20)}...</h5>
                                            <h6 className="card-subtitle mb-2">{withSlashes}</h6>
                                            <p className="card-text">{posts.desc.slice(0,50)}</p>
                                            {!user?(
                                        <Link to="/login"><i className='btnL btn mr-2'>View</i></Link>
                                    ):(<Link to={`posts/${posts.slug}/`}><i className="btnL btn mr-2">View</i></Link>)}
                                        </div>
                                    </div>
                                </div>

                           
                    </>
                )

            })}


        </>
    )
}
