import React from 'react'
import './posts.css'
function Blog() {
    return (
        <>
            <div id='postContainer' className="container">
                <div id='postCard' className="card dark">
                    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" className="card-img-top" alt="..." />
                    <div id='postCardBody' className="card-body">
                        <div className="text-section">
                            <h5 id='postTitle' className="card-title">Card title</h5>
                            <p id='postText' className="card-text">Some quick example text to build on the card's
                                content.</p>
                        </div>
                        <div className="cta-section">
                            <div>$129.00</div>
                            <a href="/" className="btn btn-light">Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Blog;