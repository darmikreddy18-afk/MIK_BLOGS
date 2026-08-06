import "./sidebar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { API_URL } from "../config.js";
function Sidebar({isOpen}) {
    const [currentUser, setCurrentUser] = useState(null);
    const location = useLocation();     
    
useEffect(() => {
    async function getCurrentUser() {
        const res = await fetch(`${API_URL}/me`, {
            credentials:"include"
        });

        const data = await res.json();

        console.log("Sidebar user:", data);

        if(data){
            setCurrentUser(data);
        }
    }

    getCurrentUser();

}, [location.pathname]);
   
    return (
         <div className={`sidebar ${isOpen ? "open" : ""}`}>

            

            <div className="nav-links">

                <Link to="/home" className="sidebar-link">
                    <i class="fa-regular fa-house fa-xl sidebar-icon "></i>
                    Home
                </Link>

                <Link to="/blogs" className="sidebar-link">
                    <i className="fa-regular fa-pen-to-square fa-xl sidebar-icon"></i>
                    Create
                </Link>

                <Link to="/library" className="sidebar-link">
                    <i class="fa-regular fa-bookmark fa-xl sidebar-icon"></i>
                    Library
                </Link>

                <Link to={currentUser ? `/user/${currentUser._id}` : "/login"} className="sidebar-link">
                    <i className="fa-regular fa-user fa-xl sidebar-icon"></i>
                    Profile
                </Link>

                <Link to="/stats" className="sidebar-link">
                    <i class="fa-solid fa-chart-line fa-xl sidebar-icon"></i>
                    Stats
                </Link>

            </div>

        </div>
    );
}

export default Sidebar;