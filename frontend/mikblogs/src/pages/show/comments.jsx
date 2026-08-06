import "./comments.css";
import DropdownComment from "../components/dropdowncomment";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config.js";

function Comments({userid,commentuserid,commentid,username, content, date, onRespond,onDeleteSuccess}) {
    const[dropdown,setdropdown]=useState(false);
    const[edit,setEdit]=useState(false);
    const[text,setText]=useState(content);

    const handleEdit=async()=>{
        setEdit(true);
        setdropdown(false);


    }
    
    const saveComment=async()=>{
        
        await fetch(`${API_URL}/comments/${commentid}`,{
            method:"PATCH",
            credentials: "include",
              headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        content: text
    })


        }
        

        

    )
setEdit(false)}
const handleDelete=async()=>{
    await fetch(`${API_URL}/comments/${commentid}/delete`,{
        method:"DELETE",
        credentials: "include"
        

    })
    onDeleteSuccess(commentid);




}
    return (

        <div className="comment-card">

            <div className="comment-card-header">
                <div className="comment-left">

                <div className="comment-author">
                    <i className="fa-solid fa-user"></i>
                    
<Link
    to={`/users/${commentuserid}`}
    className="profile-link"
>
    {username}
</Link>
                </div>
                <div className="comment-menu-container">
                <button className="comment-menu-btn"
            onClick={()=>setdropdown(!dropdown)}
            >
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            {
                dropdown && (
                    <DropdownComment
                    authoridd={userid}
                    useridd={commentuserid}
                    onEdit={()=>handleEdit()}
                    onDelete={()=>handleDelete()}
                    ></DropdownComment>
                )
            }
            </div>
            </div>

                <div className="comment-date">
                    <i className="fa-regular fa-calendar"></i>
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>

            </div>

            {edit ? (
    <>
        <textarea
        className="comment-edit-box"
            value={text}
            onChange={(e) => setText(e.target.value)}
        />

       <div className="comment-edit-actions">
    <button
        className="save-comment-btn"
        onClick={saveComment}
    >
        Save
    </button>

    <button
        className="cancel-comment-btn"
        onClick={() => {
            setText(content);
            setEdit(false);
            setdropdown(false);
        }}
    >
        Cancel
    </button>
</div>
    </>
) : (
    <div className="comment-text">
        {text}
    </div>
)}

            <div className="comment-actions">

                <button
                    className="respond-btn"
                    onClick={onRespond}
                >
                    Respond
                </button>

            </div>

        </div>
    );
}

export default Comments;