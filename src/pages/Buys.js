import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import jsPDF from "jspdf";
import 'jspdf-autotable';

const Buys = () => {

    const [purchases, setPurchases] = useState([]); //* State to save the purchases
    const [selectedPurchase, setSelectedPurchase] = useState(null); //* State to select a purchase
    const [products, setProducts] = useState([]); //* State to save the products
    const [loading, setLoading] = useState(true); //* State to handle loading
    const [error, setError] = useState(null); //* State to handle errors

    //* Get User id and role of logged user
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    //* Get all the purchases and products
    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const [purchaseResponse, productsResponse] = await Promise.all([
                    axios.get('http://localhost:3001/purchases'),
                    axios.get('http://localhost:3001/products')
                ]);
                setProducts(productsResponse.data);

                if (userRole === "admin")
                    setPurchases(purchaseResponse.data); //* If the user is an admin, get all purchases
                else {
                    const userPurchases = purchaseResponse.data.filter(purchase => purchase.userId === userId);
                    setPurchases(userPurchases);
                }

                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError('Error al cargar las compras');
                toast.error('Error al cargar las compras');
                console.error(error);
            }
        };

        fetchPurchases();
    }, [userId, userRole]) // useEffect

    //* Get products' name and price by ID
    const getProductDetails = (productId) => {
        const product = products.find(p => p.id === productId);
        return product ? { name: product.name, price: product.price } : { name: 'Product not found', price: 0 };
    }; // getProductDetails

    //* Generate PDF invoice
    const generateInvoice = (purchase) => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(18);
        doc.text("Perfumes Store", 10, 10);
        doc.setFontSize(12);
        doc.text(`Client: ${purchase.userId}`, 10, 20);

        // Table
        doc.autoTable({
            startY: 30,
            head: [['Purchase ID', 'Product', 'Quantity', 'Price', 'Total Price']],
            body: purchase.products.map(product => {
                const { name, price } = getProductDetails(product.id);
                return [
                    purchase.id,
                    name,
                    product.quantity,
                    `€${price}`,
                    `€${price * product.quantity}`
                ];
            }),
        });

        // Total
        doc.text(`Total: €${purchase.total}`, 10, doc.lastAutoTable.finalY + 10);

        // Save the PDF
        doc.save(`invoice_${purchase.id}.pdf`);

    }; // generateInvoice

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

    //* Return the purchases veiw
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Purchases</h2>
            <div className="row">
                {purchases.length > 0 ? (
                    <div className="list-group">
                        {purchases.map((purchase) => (
                            <div key={purchase.id} className="list-group-item d-flex justify-content-between align-items-center" onClick={() => setSelectedPurchase(purchase)} style={{ cursor: 'pointer' }}>
                                <div>
                                    <h5>Purchase #{purchase.id}</h5>
                                    <p>Total: {purchase.total} €</p>
                                </div>
                                <button className="btn btn-primary" onClick={(e) => {e.stopPropagation(); generateInvoice(purchase); }}>
                                    <i className="bi bi-file-earmark-pdf"></i> Dowload invoice
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-warning text-center" role="alert">
                        <p>No purchases found</p>
                    </div>
                )}
            </div>

            <div className="col-md-6">
            {selectedPurchase ? (
                        <div className="card p-4">
                            <h4>Invoice Preview</h4>
                            <p>Client: {selectedPurchase.userId}</p>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedPurchase.products && selectedPurchase.products.map((product) => {
                                        const { name, price } = getProductDetails(product.id);
                                        return (
                                            <tr key={product.id}>
                                                <td>{name}</td>
                                                <td>{product.quantity}</td>
                                                <td>€{price}</td>
                                                <td>€{product.quantity * price}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <h5 className="text-end">Total: €{selectedPurchase.total}</h5>
                        </div>
                    ) : (
                        <p className="text-center">Select a purchase to preview</p>
                    )}
            </div>

            <ToastContainer />
        </div>
    );

};

export default Buys;