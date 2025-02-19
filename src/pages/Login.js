import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
                toast.success('Successfully logged in.'); //* Show a success message
                navigate('/'); //* Navigate to the Store page
            } else toast.error('User or password incorrect.'); //! Show an error message
        } catch (error) {
            toast.error('Error while logging in. Please try again.'); //! Show an error message
            console.error(error);
        }
    }; // handleLoginSubmit

    //* Return the View with the login form
    return (
        <div className="container mt-5">
            <h2><i className="bi bi-person-circle"></i> Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;