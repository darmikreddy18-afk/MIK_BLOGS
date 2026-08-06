
import "./blogcard.css";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config"
function BlogCard({blogid,title,author,category,content,image,onClick,comments,like,authorid}) {
    const navigate=useNavigate();
     const [saved, setSaved] = useState(false);
    const handleLike=async(e)=>{
        e.stopPropagation();
        const res=await fetch(`${API_URL}/blogs/${blogid}/like`,{
            method:"POST",
            credentials:"include",
        })
        const data=await res.json();
    }

    
    const handleSave = async (e) => {
        e.stopPropagation();

        try {

            await fetch(`${API_URL}/save/${blogid}`, {
                method: "POST",
                credentials: "include"
            });

            setSaved(true);

        } catch (err) {
            console.log(err);
        }
    };
    const handleProfile=async(e)=>{
        e.stopPropagation();
        navigate(`/user/${authorid}`)


    }



    return (
        <div className="blog-card" onClick={onClick}>

            <img
    src={image}
    alt="Blog"
    className="blog-image"
/>

            <div className="card-content">

                <span className="category-tag">
                    {category}
                </span>

                <h3 className="blog-title">
                    {title}
                </h3>

                <p className="blog-preview" >
                     {content.length > 180
        ? content.substring(0, 180) + " ..."
        : content}
                </p>

                <div className="blog-footer">

                    <div className="icons">
                        <i className="fa-solid fa-user me-1" onClick={handleProfile}></i>
                        {author}
                    </div>

                    <div className="icons">

                        <i class="fa-solid fa-heart me-1"  onClick={handleLike}></i>
                        {like}
                        
                    </div>
                    <div className="icons">
                        <i class="fa-solid fa-comment me-1"></i>
                        {comments.length}
                    </div>
                    <div className="icons">
                        <i class="fa-solid fa-bookmark  me-1" onClick={(handleSave)}></i>
                    
                    </div>

                </div>

            </div>

        </div>
    );
}

export default BlogCard;