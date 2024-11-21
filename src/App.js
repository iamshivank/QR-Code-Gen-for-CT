import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import QRPage from "./components/QRPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/qr" element={<QRPage />} />
      </Routes>
    </Router>
  );
}

export default App;
