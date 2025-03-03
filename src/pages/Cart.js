import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Cart.css';

const Cart= () => {

    const [cartItems, setCartItems] = useState([]); //* State to save the items at the cart
    const navigate = useNavigate();

    //* Load cart items from localStorage
    useEffect(()  => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
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
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }; // updateQuantity

    //* Remove a product from cart
    const removeProduct = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        toast.success('Product removed')
    }; // removeProduct

    //* Handle payment form submission
    const handlePayment = (e) => {
        e.preventDefault();

        //* Check if the cart is empty
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        //* Check if the user is logged in
        const isLogged = localStorage.getItem("isLogged");
        if (!isLogged) {
            toast.error('You must be logged in to make a payment');
            return;
        }

        //* Get the user's ID
        const userId = localStorage.getItem("userId");

        //* Prepare the purchase to post it at the db
        const purchase = {
            userId: userId,
            products: cartItems.map(item => ({
                id: item.id,
                quantity: item.quantity
            })),
            total: calculateTotalPrice()
        };

        //* Process payment
        // Simulate a payment process
        try {
            Swal.fire({
                icon: 'success',
                title: 'Payment processed',
                text: 'Thank you for your purchase',
            }).then(() => {
                axios.post('http://localhost:3001/purchases', purchase)
                    .then(() => {
                        localStorage.removeItem("cart");
                        navigate('/buys');
                    })
                    .catch((error) => {
                        console.error(error);
                        toast.error('Error processing payment', error);
                }); // post
            }); // Swal
            
        } catch (error) {
            console.error(error);
            toast.error('Error processing payment', error);
        } // try-catch

    }; // handlePayment

    return (
        <div className="cart-container">
            <div className="row">
                {/* Left side: cart summary*/}
                <div className="col-md-6">
                    <h2 className="mb-4"><i className="bi bi-bag-check-fill"></i> Your cart</h2>
                    <div className="card p-4">
                        <h3 className="text-primary">Total: {calculateTotalPrice()}€</h3>
                        <hr />
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <img src={item.image} alt={item.name} className="me-3 item-image"></img>
                                        <div>
                                            <h5>{item.name}</h5>
                                            <p>{item.price} € x {item.quantity}</p>
                                        </div>
                                        <div className="d-flex algin-items-center">
                                            <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} className="form-control me-2" style={{ width: '80px'}} />
                                            <button className="btn btn-danger" onClick={() => removeProduct(item.id)}>
                                                <i className="bi bi-trash" />
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty</p>
                        ) } {/* cartitems.length */}
                    </div>
                </div>

                {/* Right side: payment*/}
                <div className="col-md-6">
                    <h2 className="mb-4"><i className="bi bi-credit-card-fill"></i> Payment</h2>
                    <div className="card p-4">
                        <form onSubmit={handlePayment}>
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                <input type="text" className="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                <input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cvv" className="form-label">CVV</label>
                                <input type="text" className="form-control" id="cvv" placeholder="123" required/>
                            </div>
                            <button type="submit" className="btn btn-pay-now w-100">Pay Now</button>
                        </form>
                    </div>
                </div>
            </div>
            < ToastContainer />
        </div>
    );

};

export default Cart;