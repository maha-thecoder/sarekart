import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
   
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    console.log("Signup Data:", formData);

    try {
      const API_BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:4000'
        : 'https://sare-kart-backend.onrender.com';

      const res = await axios.post(
        `${API_BASE_URL}/api/v1/sarekart/signup`,
        formData,
        { withCredentials: true }
      );

      console.log("Signup Response:", res.data);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);

    } catch (err) {
      console.error("Signup Error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if(err.message) {
        setError("Error: " + err.message);
      } else {
        setError("Signup failed! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1 className="brand-logo">Sarekart</h1>
          <p className="brand-tagline">Join our community</p>
        </div>
        
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              required
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              required
              onChange={handleChange}
              className="form-input"
            />
          </div>


          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="signup-text">
            Already have an account? <span onClick={() => navigate('/login')}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
