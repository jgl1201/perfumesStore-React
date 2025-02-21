import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Cart= () => {

    const [carItems, setCartItems] = useState([]); //* State to save the items at the cart
    const navigate = useNavigate();

    //* Load cart items from localStorage
    useEffect(()  => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []); // useEffect

};

export default Cart;