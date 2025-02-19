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
};

export default Register;