import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Store from './pages/Store';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Store />} />
      </Routes>
    </Router>
  );
}

export default App;
