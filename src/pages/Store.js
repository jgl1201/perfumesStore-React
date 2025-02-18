import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import './Store.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

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
    }, []); // useEffect

    //* Show an alert when the product's been added to the cart
    const handleAddToCart = (product) => {
        const isSuccesful = true;

        if (isSuccesful) {
            toast.success(`${product.name} added to the cart`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            toast.error(`Could not add  ${product.name} to the cart.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    //* Show a Loading message
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
        

    //* Show an Error message
    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                <p>{error}</p>
            </div>
        );
    }

    //* Return teh view with the products
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Perfumes Store</h1>
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
                                <button className="btn btn-success" onClick={() => handleAddToCart(product)}>
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