import React from 'react';
import './Landing.css';
import Login from '../../components/login/Login';
import avatarResting from '../../assets/images/avatarResting.png';

const Landing = () => {
  return (
    <div className="landing-page">
        <div className="landing-content">
            
                <div className="logo-container">
                    <h1 className="logo-text">MindEase AI</h1>
                </div>

                <div className="main-content">
                <div className="left-section">
                    <h2 className="main-heading">Your AI Mental Health Companion</h2>
                    <p className="main-subheading">Talk, reflect, and grow in a safe non-judgmental space.</p>
                    <div className="illustration-area">
                    <div className="avatar-placeholder">
                        <img src={avatarResting} alt="Resting Avatar" className="avatar-image" />
                    </div>
                    </div>
                </div>

                <div className="right-section">
                    <Login />
                </div>
                </div>

                <footer className="footer">
                © 2025 MindEase AI — You're not alone.
                </footer>
            </div>
        </div>
  );
};

export default Landing;