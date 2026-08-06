import "./home.css";
import BlogCard from "../blogcard/blogcard.jsx";
import{useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config.js";
function Home()  {
    const [blogs,showblogs]=useState([]);
    
    const navigate = useNavigate();
    useEffect(()=>{
        async function getblogs(){
            const res=await fetch(`${API_URL}/blogs`);
            const data=await res.json();
            showblogs(data);
        }
        getblogs();


    },[]);
    const showablog=async(key)=>{
        
        navigate(`/blogs/${key}`);

    }
    
   
    


    
    return (
        <div className="home-container">

            <h2 className="home-title">
                Latest Blogs
            </h2>

            <div className="cards-container">
                {
                    blogs.map((blog)=>{
                        return( 
                             <BlogCard
                        blogid={blog._id}
                        title={blog.title}
                        author={blog.author.username}
                        image={blog.image.url}
                        category={blog.category}
                        content={blog.content}
                        onClick={()=>showablog(blog._id)}
                        comments={blog.comment}
                        like={blog.likes.length}
                        authorid={blog.author._id}
                        ></BlogCard>

                        )
                      
                    })
                }
                
            </div>

        </div>
    );
}

export default Home;