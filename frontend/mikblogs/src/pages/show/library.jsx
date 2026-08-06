import "./library.css"
import { useState,useEffect } from "react"
import { API_URL } from "../../config.js";
function Library(){

    

    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        async function getLibrary(){
            const res=await fetch(`${API_URL}/library`,{

                credentials:"include"
            })
            const data=await res.json();
            setBlogs(data);


        }
        getLibrary();
    }

    ,[])


    return(
          <div className="library-page">

            <div className="library-header">

                <h1>
                    <i className="fa-solid fa-bookmark"></i>
                    My Library
                </h1>

                <p>
                    All the blogs you've saved for later.
                </p>

            </div>

            <div className="library-section">

                {blogs.length === 0 ? (

                    <div className="empty-library">

                        <i className="fa-regular fa-bookmark"></i>

                        <h2>No saved blogs</h2>

                        <p>
                            Bookmark blogs to see them here.
                        </p>

                    </div>

                ) : (

                    blogs.map((blog) => (

                        <div
                            key={blog._id}
                            className="profile-blog-card"
                            onClick={() => navigate(`/blogs/${blog._id}`)}
                        >

                            <img
                                 src={blog.image.url}
                                className="profile-blog-image"
                                alt=""
                            />

                            <div className="profile-blog-content">

                                <span className="profile-blog-category">
                                    {blog.category}
                                </span>

                                <h3 className="profile-blog-title">
                                    {blog.title}
                                </h3>

                                <p className="profile-blog-desc">

                                    {blog.content.length > 120
                                        ? blog.content.slice(0, 120) + "..."
                                        : blog.content}

                                </p>

                                <div className="profile-blog-date">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    )
}
export default Library