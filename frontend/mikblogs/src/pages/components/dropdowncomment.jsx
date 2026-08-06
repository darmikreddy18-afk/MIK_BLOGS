import "./dropdown.css";

function DropdownComment({authoridd,useridd,onEdit,onDelete}) {
    if(authoridd===useridd){
    return (
        <div className="blog-dropdown">

            <button className="blog-dropdown-item" onClick={onEdit}>
                <i className="fa-solid fa-pen"></i>
                Edit Comment
            </button>

            <button className="blog-dropdown-item" onClick={onDelete}>
                <i className="fa-solid fa-trash"></i>
                Delete Comment
            </button>

        </div>
    );
    
    }
    
    
    
}

export default DropdownComment;