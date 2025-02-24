import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {

    const [username, setUsername] = useState(""); //* State to save the username
    const [password, setPassword] = useState(""); //* State to save the password

    const navigate = useNavigate(); //* To navigate between pages

    //* Handle form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error('Please fill in all the fields'); //! Show an error message
            return;
        }

        // Fetch the users from the API
        try {
            const response = await axios.get('http://localhost:3001/users', {
                params: { username, password },
            });

            if (response.data.length > 0) {
                const user = response.data[0];

                //* Save the user in the localStorage
                localStorage.setItem("isLogged", true);
                localStorage.setItem("username", user.username);
                localStorage.setItem("userId", user.id);
                localStorage.setItem("userRole", user.role);

                toast.success('Successfully logged in.'); //* Show a success message
                navigate('/'); //* Navigate to the Store page
                
                window.location.reload(); //* Reload the page to re-render NavBar
                
            } else toast.error('User or password incorrect.'); //! Show an error message

        } catch (error) {
            toast.error('Error while logging in. Please try again.'); //! Show an error message
            console.error(error);
        }
    }; // handleLoginSubmit

    //* Return the View with the login form
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4"><i className="bi bi-person-circle"></i> Login</h2>
                    <form onSubmit={handleLoginSubmit} className="border border-primary p-4">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                        </div>
                        <div className="mb-3">
                            <a href="/register" className="text-muted text-decoration-none">Don't have an account yet? <span className="link-primary">Register</span></a>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;