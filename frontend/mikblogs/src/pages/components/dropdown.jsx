import "./dropdown.css";

function DropdownMenu({authorid,userid,onEdit,onDelete,onSave}) {
    if(authorid===userid){
        return (
        <div className="blog-dropdown">

            <button className="blog-dropdown-item" onClick={onEdit}>
                <i className="fa-solid fa-pen"></i>
                Edit Blog
            </button>

            <button className="blog-dropdown-item" onClick={onDelete}>
                <i className="fa-solid fa-trash"></i>
                Delete Blog
            </button>

        </div>
    );
    }
    return(
        <div className="blog-dropdown">
            <button className="blog-dropdown-item" onClick={onSave} >
                <i className="fa-solid fa-bookmark"></i>
                Save to Library
            </button>

            <button className="blog-dropdown-item" >
                <i class="fa-solid fa-link"></i>
                Copy Link
            </button>
             <button className="blog-dropdown-item" >
                <i class="fa-solid fa-flag"></i>
                Report
            </button>

        </div>
    )
  
    
}

export default DropdownMenu;