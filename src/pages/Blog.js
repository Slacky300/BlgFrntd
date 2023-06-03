import React,{useEffect,useState} from 'react'
import './css/utils.css'
import BlogItem from './BlogItem';
import Loading from '../components/Loading';
function Blog() {

    let [posts,setPosts] = useState([]);
    let [loading,setLoading] = useState(false);
    useEffect(() => {

        async function getData(){
            try{
                setLoading(true);
                let url = ` http://127.0.0.1:8000/api/posts/`;
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
                    <BlogItem posts={posts}/>
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