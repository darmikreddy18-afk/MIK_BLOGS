import "./newblog.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../config.js";
function Newblog() {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Projects");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
     const navigate = useNavigate();
    const handleSubmit = async () => {

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("image", image);

    const res = await fetch(`${API_URL}/blogs`, {
        method: "POST",
        credentials: "include",
        body: formData
    });

    navigate("/home");
};
    

    return (
        <div className="create-blog-container">

            <div className="editor-card">

                <div className="top-bar">

                    <h2 className="blog-heading">
                        Create New Blog
                    </h2>

                    <button
                        className="orange-btn"
                        onClick={handleSubmit}
                    >
                        Publish
                    </button>

                </div>

                <input
                    type="text"
                    className="blog-input"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                type="file"
                className="blog-input"
                placeholder="Paste image url"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                
                >
                </input>

                <select
                    className="blog-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option>Projects</option>
                    <option>MERN</option>
                    <option>DSA</option>
                    <option>Hackathons</option>
                    <option>College Life</option>   
                    <option>Electronics</option>
                </select>

                <textarea
                    className="blog-content"
                    placeholder="Write your blog here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

            </div>

        </div>
    );
}

export default Newblog;