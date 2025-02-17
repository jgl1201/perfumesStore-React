import React, { useEffect, useState } from "react";
import axios from "axios";

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

    //* Show a Loading message
    if (loading) return <div>Fetching products...</div>

    //* Show an Error message
    if (error) return <div> {error} </div>

    /*
    TODO: return a view with the products

        rehaz el Home.js para que use tailwind para los estilos.

        Quiero que los porductos se muestren en pequñas tarjetas de tal forma que se vea la imagen; debajo el nombre; al lado del nombre, pero en un texto secundario, la marca; debajo de nombre y marca la descripcion, tambien como texto secundario; al final de la tarjeta, el precio a la izquierda, y un botón para añadir al carrito a la derecha (sin funcionalidad por ahora)
    */
};

export default Store;