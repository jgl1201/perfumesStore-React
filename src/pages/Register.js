import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Register = () => {
    const [username, setUsername] = useState(""); //* State to save the username
    const [password, setPassword] = useState(""); //* State to save the password
    const [confirmPassword, setConfirmPassword] = useState(""); //* State to save the confirm password

    const navigate = useNavigate(); //* To navigate between pages

    //* Handle form submission
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword) {
            toast.error('Please fill in all the fields'); //! Show an error message
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match'); //! Show an error message
            return;
        }

        try {
            const newUser = { username, password, role: 'cliente' }; //* Default role is 'cliente'
            await axios.post('http://localhost:3001/users', newUser);
            toast.success('Successfully registered.'); //* Show a success message
            navigate('/login'); //* Navigate to the Login page
        } catch (error) {
            toast.error('Error while registering. Please try again.'); //! Show an error message
            console.error(error);
        }
    }; // handleRegisterSubmit

    //* Return the View with the register form
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4"><i className="bi bi-person-fill-add"></i> Register</h2>
                    <form onSubmit={handleRegisterSubmit} className="border border-primary p-4">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"></input>
                        </div>
                        <div className="mb-3">
                            <a href="/login" className="text-muted text-decoration-none">Already have an account? <span className="link-primary">Login</span></a>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;