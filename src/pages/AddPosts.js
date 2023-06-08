import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Loading from '../components/Loading';

const AddPosts = () => {


    

    let { msgType } = useContext(AuthContext);
    let [loading, setLoading] = useState(false);
    let [catg,setCatg] = useState([]);
    const addPost = async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const desc = document.getElementById("desc").value;
        const category = document.getElementById("catgr").value;
        const img = document.getElementById("formFile").files[0];
        const file = document.getElementById("formFilef").files[0];

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("img", img);
        formData.append("category",category);
        formData.append("file",file);

        try {
            setLoading(true);
            let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/`, {
                method: "POST",
                body: formData,
            })
            if (res.status === 200) {
                return msgType("success", "Post added successfully");
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(()=>{
        async function getCategory(){
            try{
                setLoading(true);
                let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/get_category/`,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                let data = await res.json();
                setCatg(data);

            }catch(error){
                return msgType("error",error.message);
            }finally{
                setLoading(false);
            }
        }

        getCategory();
    },[msgType]);

    return (
        <>
            {!loading ? (
                <div className='container my-5' data-bs-theme="dark">
                    <form id='postForm' onSubmit={addPost}>

                        <div className='mb-3'>
                        <label htmlFor="catgr" className="form-label">Category of the post</label>
                            <select className="form-select"  id='catgr' aria-label="Default select example">
                                <option  defaultValue="">Select category</option>
                                {catg.map((items)=>{
                                    return (<option value={items.id}>{items.name}</option>)
                                })}    
                            </select>
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title of the post</label>
                            <input type="text" className="form-control" name="title" id="title" placeholder="Your post title" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Related image</label>
                            <input className="form-control" name='imageF' type="file" id="formFile" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFilef" className="form-label">Related file to download</label>
                            <input className="form-control" name='fileF' type="file" id="formFilef" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Description about the post</label>
                            <textarea className="form-control" name="desc" id="desc" rows="8"></textarea>
                        </div>
                        <button type="submit" className="btn btn-dark">Add</button>
                    </form>
                </div>
            ) : <Loading />}

        </>
    )
}

export default AddPosts