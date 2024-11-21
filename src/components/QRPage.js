import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./QRPage.css";

function QRPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { badge } = location.state || {};

  if (!badge) {
    return <div>No QR code data found!</div>;
  }

  return (
    <div className="qr-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        Back
      </button>
      <div className="qr-container">
        <h1>{badge.name}</h1>
        <p>{badge.email}</p>
        <p>{badge.twitter}</p>
        <p>{badge.github}</p>
        <img src={badge.qrCode} alt="QR Code" />
      </div>
    </div>
  );
}

export default QRPage;
