import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Store from './pages/Store';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Buys from "./pages/Buys";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buys" element={<Buys />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
