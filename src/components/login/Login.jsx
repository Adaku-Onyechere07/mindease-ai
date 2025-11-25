import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log('Login submitted', { email, password, rememberMe });
  };

  const handleGuestLogin = () => {
    console.log('Continue as guest');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="login-form">
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
      </div>
    </div>
  );
};

export default Login;