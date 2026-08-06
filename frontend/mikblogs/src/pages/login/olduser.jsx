import "./olduser.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
function Login() {
const navigate = useNavigate();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, password);

    const res=await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    if(res.ok){
        navigate("/home") 
    }
};
    return (
        <div className="signup-container d-flex justify-content-center align-items-center">
            <div className="signup-card">

                <h1 className="text-center mb-4 orange-text">
                    Welcome Back
                </h1>

                <form onSubmit={handleSubmit}>

                <div className="mb-3">
                        <label className="form-label text-light">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    

                    <div className="mb-4">
                        <label className="form-label text-light">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control custom-input"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                       
                         
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn orange-btn w-100"
                    >
                        Login
                    </button>
                    <div className="text-center mt-3">
    <span className="text-light">
        Create new account
    </span>

    <Link
        to="/signup"
        className="login-link ms-2"
    >
        Signup
    </Link>
</div>
</form>

            </div>
        </div>
    );
}

export default Login;