import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Signup Data:", formData);

    try {
      const API_BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:4000'
        : 'https://sare-kart-backend.onrender.com';

      const res = await axios.post(
        `${API_BASE_URL}/api/v1/sarekart/signup`,
        formData
      );

      console.log("Signup Response:", res.data);
      alert("Account created successfully! Please login.");
      navigate('/login');

    } catch (err) {
      console.error("Signup Error:", err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else if(err.message) {
        alert("Error: " + err.message);
      } else {
        alert("Signup failed! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="signup-text">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </form>
    </div>
  );
}
