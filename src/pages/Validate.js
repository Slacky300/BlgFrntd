import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
const Validate = () => {

  let { validateEmail, loading, verified } = useContext(AuthContext);
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const verify_account = (e) => {



    validateEmail(uid, token);

  }
  useEffect(()=>{
    if(verified){
      navigate('/login');
    }
  },[verified,navigate])
  if (!loading) {
    return (
      <>
        <div className='container mt-5'>
          <div className='row d-flex justify-content-center align-items-center my-5'>
            <div className='text-center'>
              <button className='btn btn-dark my-5' onClick={verify_account}>Click here to verify your email</button>
            </div>
            
          </div>
        </div>
      </>
    )
  } else {

    return (
      <>
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
    )
  }

}

export default Validate;