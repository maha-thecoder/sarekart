import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login Data:", formData);
    try{

      const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:4000'
  : 'https://sare-kart-backend.onrender.com';
const res = await axios.post(`${API_BASE_URL}/api/v1/sarekart/login`,formData);


    console.log(res)
    console.log("Form Data Submitted:", res.data);
    
    navigate('/')
    
  
  }
  catch(err){
    if(err.response&&err.response.data&&err.response.data.message){
      alert(err.response.data.message); 
    }

    else {
      alert("Login failed! Please try again.");
    }
  }
  finally{
    setLoading(false);
  }
    
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

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

        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>

        <p className="signup-text" onClick={()=>navigate('/signup')}>
          Don't have an account? <span>Sign Up</span>
        </p>
      </form>
    </div>
  );
}
