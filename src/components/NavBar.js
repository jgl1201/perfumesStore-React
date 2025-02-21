import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavBar = () => {

    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    //* Verify if the user is Logged In
    useEffect(() => {
        const loggedInUser = localStorage.getItem("isLogged");
        const storedUsername = localStorage.getItem("username");

        if (loggedInUser) {
            setIsLogged(true);
            setUsername(storedUsername);
        }
    }, []); // useEffect

    //* Logout function
    const handleLogout = () => {
        //* Remove items from localStorage
        localStorage.removeItem("isLogged");
        localStorage.removeItem("username");

        //* Update the state
        setIsLogged(false);
        setUsername("");

        //* Navigate to the Store page
        navigate("/");

        //* Reload the page to re-render NavBar
        window.location.reload();
    } // handleLogout

    //* Return the NavBar
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                {/*User (if logged) */}
                {isLogged && (
                    <span className="navbar-text me-3">
                        <i className="bi bi-person-circle"></i> {username}
                    </span>
                )}

                {/*Link to the Store*/}
                <Link to="/" className="nav-link mx-auto mx-lg-3"><i className="bi bi-shop-window"></i> Store</Link>

                {/*Link to Cart*/}
                <Link to="/cart" className="nav-link ms-lg-3"><i className="bi bi-cart-fill"></i> Cart</Link>

                {/*Button to toggle the NavBar at small screens*/}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/*NavBar toggler items*/}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {/*Show Login and Register only if the user is not Logged*/}
                        {!isLogged && (
                            <>
                            {/*Login*/}
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    <i className="bi bi-box-arrow-in-right"></i> Login
                                </Link>
                            </li>
                            {/*Register*/}
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">
                                    <i className="bi bi-person-plus"></i> Register
                                </Link>
                            </li>
                            </>
                        )}
                        
                        {/*Show Logout only if the user is Logged*/}
                        {isLogged && (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-left"></i> Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;