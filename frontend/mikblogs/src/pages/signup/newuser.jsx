import "./newuser.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config.js"
function Signup() {
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, email, password);

    await fetch(`${API_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });
};
    return (
        <div className="signup-container d-flex justify-content-center align-items-center">
            <div className="signup-card">

                <h1 className="text-center mb-4 orange-text">
                    Create Account
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

                    <div className="mb-3">
                        <label className="form-label text-light">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control custom-input"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        Sign Up
                    </button>
                    <div className="text-center mt-3">
    <span className="text-light">
        Already registered?
    </span>

    <Link
        to="/login"
        className="login-link ms-2"
    >
        Login
    </Link>
</div>
</form>

            </div>
        </div>
    );
}

export default Signup;