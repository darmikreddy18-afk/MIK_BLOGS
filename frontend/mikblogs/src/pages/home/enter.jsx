import "./enter.css";
import { Link } from "react-router-dom";

function Enter() {
    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
            <div className="text-center">

                <h1 className="display-2 fw-bold orange-text">
                    Mik Blogs
                </h1>

                <p className="lead text-light mt-3">
                    Share your ideas, projects and experiences with students.
                </p>

                <div className="mt-4">

                    <Link
                        to="/signup"
                        className="orange-btn me-3"
                    >
                        Let's Get Started
                    </Link>

                    <Link
                        to="/login"
                        className="orange-outline-btn"
                    >
                        Login
                    </Link>

                </div>

            </div>
        </div>
    );
}

export default Enter;
