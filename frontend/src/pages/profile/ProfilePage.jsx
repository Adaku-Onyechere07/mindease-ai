import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../lib/api";
import Navbar from "../../components/navbar/NavBar";
import "./ProfilePage.css";
import { User, Mail, Calendar, Settings, LogOut } from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="profile-page-container">
        <Navbar />
        <div className="profile-content loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page-container">
        <Navbar />
        <div className="profile-content error">
          <h2>Error loading profile</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  const user = data?.data?.user;

  return (
    <div className="profile-page-container">
      <Navbar />
      <div className="profile-content">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>

        {user && (
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar-placeholder">
                <User size={64} color="#fff" />
              </div>
              <h2>{user.name}</h2>
              <p className="profile-email">{user.email}</p>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <Mail className="detail-icon" size={20} />
                <div className="detail-info">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{user.email}</span>
                </div>
              </div>

              <div className="detail-item">
                <Calendar className="detail-icon" size={20} />
                <div className="detail-info">
                  <span className="detail-label">Joined</span>
                  <span className="detail-value">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
               <div className="detail-item">
                <Settings className="detail-icon" size={20} />
                <div className="detail-info">
                  <span className="detail-label">Preferences</span>
                  <div className="preferences-list">
                    <span className={`preference-tag ${user.preferences?.notificationsEnabled ? 'active' : ''}`}>
                      Notifications
                    </span>
                     <span className={`preference-tag ${user.preferences?.dailyCheckIns ? 'active' : ''}`}>
                      Daily Check-ins
                    </span>
                  </div>
                </div>
              </div>

              <div className="logout-section">
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
