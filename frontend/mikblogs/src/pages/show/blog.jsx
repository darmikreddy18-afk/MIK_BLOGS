    import "./blog.css";
    import{useEffect,useState} from "react";
    import {useParams} from "react-router-dom";
    import DropdownMenu from "../components/dropdown.jsx";
    import Comment from "../components/comment.jsx";
    import {Link, useNavigate } from "react-router-dom";
    import Comments from "./comments.jsx";
    import DropdownComment from "../components/dropdowncomment.jsx";
    import { API_URL } from "../../config.js";
    function ShowBlog(){
        const navigate=useNavigate();
        const { id } = useParams();
        const[blog,setBlog]=useState(null);
        const[dropdown,setdropdown]=useState(false)
        const[comments,setComments]=useState(null);
        useEffect(()=>{
            async function getblog(){
                const res=await fetch(`${API_URL}/blogs/${id}`);
            const data=await res.json();
            setBlog(data);

            }
            getblog();

        },[id]);
        const [currentUser, setCurrentUser] = useState([]);

useEffect(() => {
    async function getCurrentUser() {
        const res = await fetch(`${API_URL}/me`, {
            credentials: "include",
        });

        if (res.ok) {
            const data = await res.json();
            console.log("Current user:", data);
            setCurrentUser(data);
        }
        else{
            console.log("not logged in")
        }
        
       
    }

    getCurrentUser();
}, []);
async function getComment(){
        const res=await fetch(`${API_URL}/blogs/${id}/comments`,{
          credentials: "include",  
        });
        const comments=await res.json();
        setComments(comments);
    }
   
useEffect(()=>{
    getComment();

},[])

const handleEdit=(key)=>{
    navigate(`/blogs/${key}/edit`);

}
const handleSave=async()=>{
    await fetch(`${API_URL}/save/${blog._id}`,{
        method: "POST",
            credentials: "include",
            headers: { 
                "Content-Type": "application/json"
            },
            
    });
   
    navigate("/library");
}
const handleDelete=async(key)=>{
    await fetch(`${API_URL}/blogs/${key}/delete`,{
        method: "DELETE",
            credentials: "include",
            headers: { 
                "Content-Type": "application/json"
            },
            
    });
    navigate("/home");

}
const removeComment = (commentId) => {
    setComments(prevComments =>
        prevComments.filter(comment => comment._id !== commentId)
    );
};




        if(!blog){
            return(
                <h2>Loading...</h2>
            )
        }
        return(
            <div className="blog-page">

                <div className="blog-wrapper">

                    <h1 className="blog-page-title">
                        {blog.title}
                    </h1>

                    <div className="blog-meta">

        <div className="left-meta">

            <span>
                <i className="fa-solid fa-user"></i>
                <Link
    to={`/user/${blog.author._id}`}
    className="profile-link"
>
    {blog.author.username}
</Link>
            </span>

            <span>
                <i className="fa-regular fa-calendar"></i>
                {new Date(blog.createdAt).toLocaleDateString()}
            </span>

        </div>

        <div className="right-meta">

            <span className="blog-category">
                {blog.category}
            </span>

            <div className="menu-container">
                <button className="menu-btn"
            onClick={()=>setdropdown(!dropdown)}
            >
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            {
                dropdown && (
                    <DropdownMenu
                    authorid={blog.author._id}
                    userid={currentUser?._id}
                    onEdit={()=>handleEdit(id)}
                    onDelete={()=>handleDelete(id)}
                    onSave={()=>handleSave()}
                    ></DropdownMenu>
                )
            }
            </div>
            

        

        </div>

    </div>

                    <img
                     src= {blog.image.url}
                        alt={blog.title}
                        className="blog-cover"
                    />

                    <div className="blog-content">
                        {blog.content}
                    </div>
                    <div className="blog-divider"></div>
                    <Comment
                    blogid={id}
                    onCommentAdded={getComment}
                    ></Comment>
                    
                    
<div className="comments-section">
    <div className="blog-divider"></div>

    <h2 className="comments-title">
        Comments
    </h2>

    {comments?.map((comment) => (
        <Comments
        
            userid={currentUser?._id}
            commentuserid={comment.author._id}  
            commentid={comment._id}
            key={comment._id}
            username={comment.author.username}
            content={comment.content}
            date={comment.createdAt}
            onDeleteSuccess={removeComment}
        />
    ))}

</div>
                    

                </div>
                

            </div>
        
        )
    }
    export default ShowBlog;