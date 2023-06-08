import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/utils.css'
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


function BlogItem(props) {

    

    let {user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if (!user) {
            navigate('/login')
        }
    })
    return (
        <>

            {props.posts.map((posts) => {
                const date = new Date(posts.uploadedOn);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();

                const withSlashes = [day, month, year].join('/');
                return (
                    <article className="postcard dark blue slideInUp" key={posts.id}>
                        <Link className="postcard__img_link" to="/posts">
                            <img className="postcard__img" src={`${process.env.REACT_APP_SERVER_URL}/${posts.img}`} alt="" />
                        </Link>
                        <div className="postcard__text">
                            {!user?
                            (<Link to='/login' style={{textDecoration: "none"}}><h1 className="postcard__title blue">{posts.title}</h1></Link>):
                            (<Link to={`${posts.slug}/`} style={{textDecoration: "none"}}><h1 className="postcard__title blue">{posts.title}</h1></Link>)}
                            <div className="postcard__subtitle small">
                                <time dateTime="2020-05-25 12:00:00">
                                    <i className="fas fa-calendar-alt mr-2"></i> {withSlashes}
                                </time>
                            </div>
                            <div className="postcard__bar"></div>
                            <div className="postcard__preview-txt">{posts.desc.slice(0,150)}...</div>
                            <ul className="postcard__tagbox">
                                <li className="tag__item"><i className="far fa-thumbs-up mr-2"></i> {posts.likes.length} likes</li>
                                <li className="tag__item"><i className="far fa-comments mr-2"></i> {posts.noOfCmnts} comments</li>

                                <li className="tag__item play blue">
                                    {!user?(
                                        <Link to="/login" style={{textDecoration: "none"}}><i className='fas fa-eye mr-2'> View</i></Link>
                                    ):(<Link to={`${posts.slug}/`} style={{textDecoration: "none"}}><i className="fas fa-eye mr-2"></i> View</Link>)}
                                    
                                </li>
                            </ul>
                        </div>
                    </article>
                )

            })}


        </>
    )
}

export default BlogItem