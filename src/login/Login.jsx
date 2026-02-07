import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Login Data:", formData);
    try{
      const API_BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:4000'
        : 'https://sare-kart-backend-production.up.railway.app';
      const res = await axios.post(`${API_BASE_URL}/api/v1/sarekart/login`,formData, {
        withCredentials: true
      });
      console.log(res)
      console.log("Form Data Submitted:", res.data);
      // Cookie is set by backend; navigate to main site
      navigate('/')
    }
    catch(err){
      if(err.response&&err.response.data&&err.response.data.message){
        setError(err.response.data.message);
      } else {
        setError("Login failed! Please try again.");
      }
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1 className="brand-logo">Sarekart</h1>
          <p className="brand-tagline">Welcome back</p>
        </div>
        
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Login to Your Account</h2>
          
          {error && <div className="error-message">{error}</div>}

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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-text">
            Don't have an account? <span onClick={()=>navigate('/signup')}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
