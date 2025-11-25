import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../lib/api";
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    preferredLanguage: 'en'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || !formData.name) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined
      });
      
      // Auto login or redirect to login
      if (response.data.success) {
        // Store token if returned, or just redirect
        if (response.data.data && response.data.data.accessToken) {
            localStorage.setItem('token', response.data.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            navigate("/chat");
        } else {
            navigate("/login");
        }
      }
    } catch (err) {
      console.error("Signup failed:", err);
      let errorMessage = "Signup failed. Please try again.";
      
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        // Extract the first validation error message
        errorMessage = err.response.data.errors[0].msg;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      
      setError(errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
        />
        <div style={{fontSize: '12px', color: '#666', marginTop: '-15px', marginBottom: '15px', paddingLeft: '5px'}}>
          Must contain uppercase, lowercase & number
        </div>
        <div className="form-row">
            <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="signup-input half-width"
            />
            <select
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            className="signup-input half-width"
            >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="hi">Hindi</option>
            </select>
        </div>
        
        <button onClick={handleSignup} className="signup-button">
          Sign Up
        </button>
        <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
