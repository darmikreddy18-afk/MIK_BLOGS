import "./comment.css";

import { useState } from "react";
import { API_URL } from "../../config";

function Comment({ blogid,onCommentAdded}) {
    const[content,setContent]=useState("");
   const handleSubmit = async () => {
    if (!content.trim()) return;

    const res = await fetch(
        `${API_URL}/${blogid}/comments`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content
            })
        }
    );

    if (res.ok) {
        setContent("");
        onCommentAdded();
    }
};
    return (
        <div className="comment-box">

            <h3 className="comment-heading">
                Leave a Comment
            </h3>

            <textarea
                className="comment-input"
                placeholder="Write your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button
                className="comment-btn"
                onClick={handleSubmit}
            >
                Post Comment
            </button>

        </div>
    );
}

export default Comment;