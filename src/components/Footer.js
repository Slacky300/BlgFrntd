// import React, { useEffect, useState } from 'react'


function Footer() {
    

    // let [url,setUrl] = useState(window.location.pathname)
    // console.log(url)

        
    // useEffect(()=>{
       
        
    //     function setFoot(){
    //         setUrl(window.location.href)
    //         let btm = document.getElementById("footerB");
    //         if(url === "/login" || url === "/register"){
                
    //             btm.style.display = "none";
                

               
    //         }else{
    
    //             btm.style.display = "block";
                
               
    //         }
    //     }

    //     setFoot();
    // },[url])

    

    return (
        <>
            <section className="navbar-fixed-bottom mt-5" id='footerB' data-bs-theme = "dark">

                <footer className="text-center text-white navbar-fixed-bottom" style={{backgroundColor: "rgb(43, 48, 53)"}}>

                    <div className="container p-4 pb-0 mt-5" >

                        <section className="">
                            <div className="d-flex justify-content-center align-items-center">
                                <span className="me-3 text-white">Follow me on Github</span>
                                <button type="button text-center" className="btn btn-outline-light btn-rounded">
                                <i class="fab fa-github"> Github</i>
                                </button>
                            </div>
                        </section>

                    </div>


                    <div className="text-center p-3" style={{backgroundColor: "rgb(43, 48, 53)"}}>
                        <span className="text-white">@2023 Copyright: </span>
                        <a className="text-white" href="https://mdbootstrap.com/">Absolutno.tech</a>
                    </div>

                </footer>

            </section>
        </>
    )
}

export default Footer