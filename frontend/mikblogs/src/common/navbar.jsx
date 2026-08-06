import "./navbar.css";
import { useState,useEffect } from "react";
import Sidebar from "./sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config.js";
function Navbar(){
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const[sidebar,setsidebar]=useState(true);
  const navigate = useNavigate();
  const[logout,setlogout]=useState(false);

  useEffect(() => {


    async function searchBlogs() {

        if (!query.trim()) {
            setResults([]);
            return;
        }

        const res = await fetch(
            `${API_URL}/search?query=${query}`
        );

        const data = await res.json();

        setResults(data);
    }

    searchBlogs();

}, [query]);
async function handleLogout(){
  await fetch(`${API_URL}/logout`,{
    credentials:"include"
  })
  setlogout(true);
  navigate("/");
  window.location.reload();
}
  
 const handleClick=()=>{
  setsidebar(!sidebar)
  
  }


    return(
    <>
    <Sidebar isOpen={sidebar} />
    <nav className=" main navbar fixed-top  navbar-expand-lg" data-bs-theme="dark">
    
    <div className="menu-btn" onClick={handleClick}>
      <i class="fa-solid fa-bars fa-lg"></i>
    </div>
    <div className="container-fluid">
    <a className="navbar-brand" href="/">MIK</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
<form
    className="d-flex"
    role="search"
    onSubmit={(e) => e.preventDefault()}
>
       <div className="search-container">
       <input
    className="form-control me-2 search-input"
    type="search"
    placeholder="Search"
    aria-label="Search"
    value={query}
    onChange={(e) => setQuery(e.target.value)}


    
/>
 {results.length > 0 && (
        <div className="search-dropdown">
            {results.map((blog) => (
                <div
                                            key={blog._id}
                                            className="search-item"
                                            onClick={() => {
                                                navigate(`/blogs/${blog._id}`);

                                                setQuery("");
                                                setResults([]);
                                            }}
                                        >
                                            {blog.title}
                                        </div>
            ))}
        </div>
    )} 
    </div>   
      </form>
      <button 
    className="logout-btn"
    onClick={handleLogout}
  
>
    <i className="fa-solid fa-right-from-bracket"></i>
    Logout
</button>
    </div>
  </div>
</nav>

        </>
    )
}
export default Navbar;