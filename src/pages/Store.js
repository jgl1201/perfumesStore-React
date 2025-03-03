import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import './Store.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const Store = () => {
    
    const [products, setProducts] = useState([]); //* State to save the products
    const [loading, setLoading] = useState(true); //* State to handle loading
    const [error, setError] = useState(null); //* State to handle errors

    //* Get products from JSON file using axios
    useEffect( () => {
        axios.get('http://localhost:3001/products')
            .then( (response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch( (error) => {
                console.error(error);
                setError('Error al cargar los productos: ', error);
                setLoading(false);
            });

            //* Show a Legal warning
            Swal.fire({
                title: 'Legal warning',
                html:   `<p>
                            <strong>Legal:</strong> This page has been created for educational purposes only. The products shown are just examples of existing prodicts and are not intended to tarnish the image or harm any brand mentioned. All rights reserved to their respective owners.
                        </p>`,
                timer: 10000,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                icon: 'info',
            });

    }, []); // useEffect

    //* Handle adding a product to the cart
    const handleAddToCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || []; //* fetch the existing cart or initialize it as empty list
        const existingItem = existingCart.find((item) => item.id === product.id); //* find if the product is already int the cart

        if (existingItem) {
            existingItem.quantity += 1;
            toast.info(`${product.name} already at cart. Updating quantity.`);
        } else {
            existingCart.push({...product, quantity: 1});
            toast.success(`${product.name} added to cart.`)
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));

    }; // handleAddToCart

    //? Show a Loading message
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading products...</p>
            </div>
        );
    } 
        

    //! Show an Error message
    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                <p>{error}</p>
            </div>
        );
    }

    //* Return teh view with the products
    return (
        <div className="store-container">
            <h1 className="text-center mb-4"><i className="bi bi-gem primary"></i> Perfumes Store</h1>
            <div className="row">
                {products.map( (product) => (
                    <div key={product.id} className="col-md-4 b-4 mb-4">
                        <div className="card h-100">
                            <div className="card-img-container">
                                <img src={product.image} alt={product.name} className="card-img-top card-img img-fluid object-fit-contain" style={{ height: '200px', objectFit: 'cover' }}/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{product.name} <small className="text-muted">· {product.brand}</small> </h5>
                                <p className="card-text text-muted">{product.description}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <span className="text-primary">{product.price} €</span>
                                <button className="btn btn-add-to-cart" onClick={() => handleAddToCart(product)}>
                                    <i className="bi bi-cart-plus"></i> Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Store;