import React from 'react';
import './Landing.css';
import Login from '../../components/login/Login';
// import avatarResting from '../../assets/images/avatarResting'

const Landing = () => {
  return (
    <div className="landing-page">
        <div className="landing-content">
                <div className="logo-container">
                <div className="logo">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5Z" fill="#2C6B6B"/>
                    <path d="M20 12C18.343 12 17 13.343 17 15C17 16.657 18.343 18 20 18C21.657 18 23 16.657 23 15C23 13.343 21.657 12 20 12Z" fill="white"/>
                    <path d="M15 20C15 18.895 15.895 18 17 18H23C24.105 18 25 18.895 25 20V26C25 27.105 24.105 28 23 28H17C15.895 28 15 27.105 15 26V20Z" fill="white"/>
                    </svg>
                </div>
                <h1 className="logo-text">MindEase AI</h1>
                </div>

                <div className="main-content">
                <div className="left-section">
                    <h2 className="main-heading">Your AI Mental Health Companion</h2>
                    <p className="main-subheading">Talk, reflect, and grow in a safe non-judgmental space.</p>
                    <div className="illustration-area">
                    {/* <div className="plant-left">
                        <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
                        <ellipse cx="30" cy="30" rx="15" ry="25" fill="#A8D5D5" opacity="0.6"/>
                        <ellipse cx="45" cy="55" rx="18" ry="30" fill="#A8D5D5" opacity="0.6"/>
                        <ellipse cx="25" cy="75" rx="12" ry="20" fill="#A8D5D5" opacity="0.6"/>
                        <rect x="38" y="75" width="4" height="45" fill="#8CC5C5" opacity="0.6"/>
                        </svg>
                    </div> */}
                    <div className="avatar-placeholder">
                        {/* <img src={avatarResting} alt="" /> */}
                    </div>
                    {/* <div className="plant-right">
                        <svg width="100" height="140" viewBox="0 0 100 140" fill="none">
                        <ellipse cx="50" cy="35" rx="20" ry="35" fill="#A8D5D5" opacity="0.6"/>
                        <ellipse cx="70" cy="60" rx="15" ry="25" fill="#A8D5D5" opacity="0.6"/>
                        <ellipse cx="55" cy="85" rx="18" ry="28" fill="#A8D5D5" opacity="0.6"/>
                        <rect x="48" y="85" width="4" height="55" fill="#8CC5C5" opacity="0.6"/>
                        </svg>
                    </div> */}
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