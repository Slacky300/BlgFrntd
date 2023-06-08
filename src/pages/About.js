import React from 'react'
import '../pages/css/utils.css'


const About = () => {
  return (
    <>
      <div className='container d-flex justify-content-center align-items-center vh-100'>
        <div className=' row  d-flex justify-content-center align-items-center'>
          <div className='col-lg-6  py-4 px-4  d-flex justify-content-center align-items-center'>
            <h1 className='slideInLeft'>ABSOLUTNO</h1>
          </div>
          <div className='col-lg-6  py-4 px-4  d-flex justify-content-center align-items-center'>
            <ul className='fadeIn'>
              <li>Absolutno.tech is just a side project developed by <i className='fab fa-github'> Slacky 300</i></li>
              <li>This website is built using React JS, Django Rest Framework, Djoser Library, Bootstrap 5 (A big thanks to bootstrap without it this was not possible).</li>
            </ul>

          </div>
        </div>
      </div >
    </>
  )
}

export default About