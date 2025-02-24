import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import jsPDF from "jspdf";
import 'jspdf-autotable';

const Buys = () => {

    const [purchases, setPurchases] = useState([]); //* State to save the purchases
    const [products, setProducts] = useState([]); //* State to save the products
    const [loading, setLoading] = useState(true); //* State to handle loading
    const [error, setError] = useState(null); //* State to handle errors

    const navigate = useNavigate();

    //* Get User id and role of logged user
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    //* Get user's purchases
    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const respone = await axios.get('http://localhost:3001/purchases');
                if (userRole === "admin") setPurchases(respone.data); //* If the user is an admin, get all purchases
                else setPurchases(respone.data.filter(purchase => purchase.userId === userId)); //* If the user is a customer, get only his purchases

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
                console.error(error);
            }
        };

        fetchPurchases();
    }, [userId, userRole]) // useEffect

    //* Generate PDF bill file
    const generateInvoice = (purchase) => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.text("Perfumes Store", 10, 10);
        doc.setFontSize(12);
        doc.text(`Client: ${purchase.userId}`, 10, 10);

        // Table
        doc.autoTable({
            startY: 30,
            head: [['Purchase ID', 'Product', 'Quantity', 'Price']],
            body: purchase.products.map(product => [
                purchase.id, product.name, product.quantity, `$${product.price}`
            ]),
        });

        // Total
        doc.text(`Total: $${purchase.total}`, 10, doc.lastAutoTable.finalY + 10);

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
            {purchases.length > 0 ? (
                <div className="list-group">
                    {purchases.map(purchase => (
                        <div key={purchase.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Purchase #{purchase.id}</h5>
                                    <p>Total: ${purchase.total}</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => generateInvoice(purchase)}>
                                    <i className="bi bi-download">Download Invoice</i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No purchases yet</p>
            )}
        </div>
    );

};

export default Buys;