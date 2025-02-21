import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Cart= () => {

    const [cartItems, setCartItems] = useState([]); //* State to save the items at the cart
    const navigate = useNavigate();

    //* Load cart items from localStorage
    useEffect(()  => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []); // useEffect

    //* Calculate tota price
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }; // calculateTotalPrice

    //* Update the cuantity of a product
    const updateQuantity = (id, newQantity) => {
        const updatedCart = cartItems.map((item) => 
            item.id === id ? {...item, quantity: newQantity} : item
        );

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }; // updateQuantity

};

export default Cart;