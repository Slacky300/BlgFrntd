import React from 'react'

export const BlogDetail = () => {
    return (
        <>
            <div className='row px-4 py-4'>
                <div className='col-lg-6  py-4 px-4  d-flex justify-content-center align-items-center'>
                    <img className='image-fluid img-thumbnail' src='https://img-getpocket.cdn.mozilla.net/296x148/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fbc2206a9-fa95-4757-ad84-74784dc4ed6e.jpeg' alt='imagesI' />
                </div>

                <div className='col-lg-6 py-4 px-4'>
                    <h1>Hello this is it</h1>
                    <p> With the help of an expert weaver, archaeologists have unraveled the design secrets behind the world's oldest pants. The 3,000-year-old wool trousers belonged to a man buried between 1000 and 1200 BCE in Western China. To make them, ancient weavers combined four different techniques to create a garment specially engineered for fighting on horseback, with flexibility in some places and sturdiness in others.
                        The softer side of materials science

                        Most of us don't think much about pants these days, except to lament having to put them on in the morning. But trousers were actually a technological breakthrough. Mounted herders and warriors needed their leg coverings to be flexible enough to let the wearer swing a leg across a horse without ripping the fabric or feeling constricted. At the same time, they needed some added reinforcement at crucial areas like the knees. It became, to some extent, a materials-science problem. Where do you want something elastic, and where do you want something strong? And how do you make fabric that will accomplish both? </p>
                </div>

            </div>
            <hr />

           <div className='row px-4 py-3'>
            <h2 className='pb-4'>Comments (28)</h2>
                    <div className="card shadow-0 border bg-dark" >
                        <div className="card-body p-4 bg-dark">
                            <div className="form-outline mb-4">
                                <input type="text" id="addANote" className="form-control" placeholder="Type comment..." />
                            </div>

                            <div className="card mb-4">
                                <div className="card-body bg-dark" style = {{color: "#fff"}}>
                                    <p>Type your note, and hit enter to add it</p>

                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp" alt="avatar" width="25"
                                                height="25" style = {{borderRadius: "50%"}} />
                                            <p className="small mb-0 ms-2">Martha</p>
                                        </div>
                                        <div className="d-flex flex-row align-items-center text-light">
                                            <p className="small mb-0 text-light" >Upvote?</p>
                                            <i className="far fa-thumbs-up mx-2 fa-xs text-light" style={{marginTtop: "-0.16rem"}}></i>
                                            <p className="small mb-0 text-light">3</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            

                    </div>

        </>
    )
}
