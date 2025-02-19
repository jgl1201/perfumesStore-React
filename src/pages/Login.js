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

            if (response,data.length > 0) {
                TbAsterisk.success('Successfully logged in.'); //* Show a success message
                navigate('/'); //* Navigate to the Store page
            } else toast.error('User or password incorrect.'); //! Show an error message
        } catch (error) {
            toast.error('Error while logging in. Please try again.'); //! Show an error message
            console.error(error);
        }
    }; // handleLoginSubmit

    //TODO * Return the View with the login form
};

export default Login;