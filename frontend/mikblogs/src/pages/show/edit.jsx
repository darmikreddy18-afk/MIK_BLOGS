import "./edit.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config.js";

function EditBlog() {

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Projects");
    const [content, setContent] = useState("");

    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {

        async function getBlog() {

            const res = await fetch(
                `${API_URL}/blogs/${id}`,
                {
                    credentials:"include"
                }
            );

            const data = await res.json();

            setTitle(data.title);
            setCategory(data.category);
            setContent(data.content);
            setOldImage(data.image);

        }

        getBlog();

    }, [id]);



    const handleSubmit = async () => {

        const formData = new FormData();

        formData.append("title", title);
        formData.append("category", category);
        formData.append("content", content);


        // new image selected
        if(image){
            formData.append("image", image);
        }

        // keep old image
        else{
            formData.append(
                "oldImage",
                JSON.stringify(oldImage)
            );
        }


        const res = await fetch(
            `${API_URL}/blogs/${id}/edit`,
            {
                method:"PATCH",
                credentials:"include",
                body:formData
            }
        );


        const data = await res.json();

        console.log(data);


        if(res.ok){
            navigate(`/blogs/${id}`);
        }

    };



    return (

        <div className="create-blog-container">

            <div className="editor-card">


                <div className="top-bar">

                    <h2 className="blog-heading">
                        Edit Blog
                    </h2>


                    <button
                        type="button"
                        className="orange-btn"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>

                </div>



                <input
                    type="text"
                    className="blog-input"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />



                <input
                    type="file"
                    className="blog-input"
                    accept="image/*"
                    onChange={(e)=>setImage(e.target.files[0])}
                />



    {
    oldImage?.url && (
        <img
            src={oldImage.url}
            alt="Current"
            style={{
                width: "200px",
                borderRadius: "10px",
                margin: "10px 0"
            }}
        />
    )
}


                <select
                    className="blog-select"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
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
                    onChange={(e)=>setContent(e.target.value)}
                />



            </div>

        </div>

    );

}

export default EditBlog;