import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavBar = () => {

    //* Return the NavBar
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/*Link to the Store*/}
                <Link to="/" className="navbar-brand">Store</Link>

                {/*Button to toggle the NavBar*/}
                <button className="navbar-toggler" type="button" dara-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/*NavBar toggler items*/}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
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
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;