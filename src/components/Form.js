import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import "./Form.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    twitter: "",
    github: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const { name, email, twitter } = formData;
    if (!name || !email) return "Name and email are required.";
    if (!/\s/.test(name)) return "Enter both first and last name.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";
    if (twitter && !twitter.startsWith("@"))
      return "Twitter handle must start with '@'.";
    return "";
  };

  const handleCreate = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    const qrData = JSON.stringify(formData);
    const qrCode = await QRCode.toDataURL(qrData);

    navigate("/qr", { state: { badge: { ...formData, qrCode } } });
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="title">QR Code Badge Generator</h1>
      <div className="form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="twitter"
          value={formData.twitter}
          onChange={(e) =>
            setFormData({ ...formData, twitter: `@${e.target.value.replace(/^@/, "")}` })
          }
          placeholder="Twitter Handle (optional)"
        />
        <input
          type="text"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="GitHub Username (optional)"
        />
        <div className="buttons">
          <button className="cancel-btn" onClick={() => setFormData({ name: "", email: "", twitter: "", github: "" })}>
            Cancel
          </button>
          <button className="create-btn" onClick={handleCreate}>
            Create
          </button>
        </div>
        {error && (
          <motion.p
            className="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default Form;
