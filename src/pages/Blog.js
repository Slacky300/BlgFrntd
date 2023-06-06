import React,{useEffect,useState, useContext} from 'react'
import './css/utils.css'
import BlogItem from './BlogItem';
import Loading from '../components/Loading';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';


function Blog() {

    let [posts,setPosts] = useState([]);
    let [loading,setLoading] = useState(false);
    let { user } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(()=>{
        if (!user) {
            navigate('/login')
        }
    })
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
        

    },[]);

    return (
        <>
            {!loading?(<section id='postSection' className="dark">
                <div className="container py-4">
                    <h1 className="h1 text-center" id="pageHeaderTitle" style={{color: "#fff"}}>My Posts</h1>
                    <BlogItem posts={posts} />
                </div>
            </section>
            ):(
                <Loading/>
            )

            }
            

        </>
    )
}

export default Blog;