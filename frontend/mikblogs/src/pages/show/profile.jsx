import "./profile.css";
import { useParams ,Link, useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import { API_URL } from "../../config.js"
function Profile() {
    const navigate=useNavigate()
    const[user,setUser]=useState(null);
    const[blogs,setBlogs]=useState([]);
    const[comments,setComments]=useState([]);
    const {id}=useParams()
    useEffect(()=>{
         async function getProfile(){

            
            const res=await fetch(`${API_URL}/users/${id}`,{
                credentials:"include"
            })
            const data=await res.json();
            setUser(data.user);
            setBlogs(data.blogs);
            setComments(data.comments)

        }
        getProfile();
    },[id]);
    
    if (!user) return <h2>Loading...</h2>;

    return (
        <div className="profile-page">

            <div className="profile-header">

                <div className="profile-avatar">
                    <i className="fa-solid fa-user"></i>
                </div>

                <h1 className="profile-name">
                    {user.username}
                </h1>

                <p className="profile-bio">
                    Full Stack MERN Developer • Passionate about building beautiful web applications.
                </p>

                <p className="profile-date">
                    Member since June 2026
                </p>

            </div>

            <div className="profile-stats">

                <div className="stat-card">
                    <h2>{blogs.length}</h2>
                    <span>Blogs</span>
                </div>

                <div className="stat-card">
                    <h2>{comments.length}</h2>
                    <span>Comments</span>
                </div>

                <div className="stat-card">
                    <h2>{
            blogs.reduce((total, blog) => {
                return total + blog.likes.length;
            }, 0)
        }</h2>
                    <span>Likes</span>
                </div>

            </div>

            <div className="profile-section">

                <h2 className="section-title">
                    Recent Blogs
                </h2>

                {   
                    blogs?.map((blog)=>{
                        return(
                            <div key={blog._id} className="profile-blog-card" onClick={()=>navigate(`/blogs/${blog._id}`)}>

                    <img
                         src={blog.image.url}
                        alt=""
                        className="profile-blog-image"
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


                        )
                        
                    })
                }

            </div>

        </div>
    );
}

export default Profile;