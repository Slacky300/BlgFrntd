import React, {useState, useEffect} from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Loading from '../components/Loading';
 
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Admin = () => {

    let [posts,setPosts] = useState([]);
    let [loading,setLoading] = useState(false);
    let { msgType } = useContext(AuthContext);
    let [deleted,setDeleted] = useState(false);
    useEffect(() => {

        async function getData(){
            try{
                setLoading(true);
                let url = `${process.env.REACT_APP_SERVER_URL}/api/posts/`;
                let res =  await fetch(url,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                let data = await res.json();
                setPosts(data);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
            
        }

        getData();
        

    },[deleted]);

    let deletePost = async (slug) => {
        try{
            setLoading(true)

            let url = `${process.env.REACT_APP_SERVER_URL}/api/posts/${slug}/`;
            let res = await fetch(url,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },

            })

            
            
            if(res.statusText === "OK"){
                return msgType("success","Post deleted successfully")
            }else{
                return msgType("error",res.status)
            }
           
        }catch(error){
            console.log(error.message);
            
        }finally{
            setLoading(false);
            setDeleted(true);
            
        }
        
    }

    return (
        <>
        {!loading?(
                <div className='container my-5 fadeIn'>
                    <div className='d-flex justify-content-end'>
                    <Link to= "/add_post"><button className='btn btn-dark'>Add Post</button></Link>

                    </div>
                <table className="table table-dark">
                    <thead>
                        <tr >
                            <th scope="col">Id</th>
                            <th scope="col">Category</th>
                            <th scope="col">Title</th>
                            <th scope="col">Uploaded On</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((items)=>{
                             const date = new Date(items.uploadedOn);
                             const year = date.getFullYear();
                             const month = date.getMonth() + 1;
                             const day = date.getDate();
             
                             const withSlashes = [day, month, year].join('/');
                            return(
                                <>
                                    <tr key={items.id}>
                                        <th scope='row'>{items.id}</th>
                                        <td>{items.catgName}</td>
                                        <td>{items.title}</td>
                                        <td>{withSlashes}</td>
                                        <td><button className='btn btn-danger' onClick={()=>{deletePost(items.slug)}}>Delete</button></td>
                                    </tr>
                                </>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
        ): <Loading />}
           
        </>
    )
                    
    
}

export default Admin