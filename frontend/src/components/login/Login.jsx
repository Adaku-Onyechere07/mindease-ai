import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../lib/api";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (email.trim() === "" || password.trim() === "") {
      setError("Email and Password cannot be empty.");
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        navigate("/home");
      }
    } catch (err) {
      console.error("Login failed:", err);
      let errorMessage = "Login failed. Please check your credentials.";
      
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        errorMessage = err.response.data.errors[0].msg;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      
      setError(errorMessage);
    }
  };

  const handleGuestLogin = () => {
    // Guest login logic if supported by backend, or just navigate
    navigate("/chat");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <div className="error-message" style={{color: 'red', marginBottom: '10px', textAlign: 'center'}}>{error}</div>}
      <form className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <div className="login-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="checkbox-input"
            />
            <span className="checkbox-label">Remember me</span>
          </label>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <button onClick={handleGuestLogin} className="guest-button">
          Continue as Guest
        </button>
        <div className="signup-link" style={{textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#4A7777'}}>
            Don't have an account? <Link to="/signup" style={{color: '#2C6B6B', fontWeight: '600', textDecoration: 'none'}}>Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;