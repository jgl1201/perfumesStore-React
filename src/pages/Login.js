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
    };
};

export default Login;