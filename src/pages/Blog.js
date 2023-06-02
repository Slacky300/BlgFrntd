import React,{useEffect,useState} from 'react'
import './utils.css'
import BlogItem from './BlogItem';
function Blog() {

    let [posts,setPosts] = useState([]);
    useEffect(() => {

        async function getData(){
            try{
                let url = "https://eventmanagementsystem.pythonanywhere.com/getposts/";
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
            }
            
        }

        getData();
        

    },[]);

    return (
        <>
            <section id='postSection' className="dark">
                <div className="container py-4">
                    <h1 className="h1 text-center" id="pageHeaderTitle" style={{color: "#fff"}}>My Posts</h1>
                    <BlogItem posts={posts}/>
                </div>
            </section>

        </>
    )
}

export default Blog;