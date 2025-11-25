import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../lib/api";
import Navbar from "../../components/navbar/NavBar";
import "./HomePage.css";
import { MessageSquare, BookOpen, User, Heart, Sun, Moon } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const user = userProfile?.data?.user;
  const hour = new Date().getHours();
  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  if (hour >= 17) greeting = "Good Evening";

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-content">
        <header className="home-header">
          <h1>{greeting}, {user?.name || "Friend"}</h1>
          <p className="subtitle">How are you feeling right now?</p>
        </header>

        <div className="mood-selector">
          <button className="mood-btn happy">
            <Sun size={32} />
            <span>Great</span>
          </button>
          <button className="mood-btn neutral">
            <Heart size={32} />
            <span>Okay</span>
          </button>
          <button className="mood-btn sad">
            <Moon size={32} />
            <span>Not Good</span>
          </button>
        </div>

        <div className="quick-actions">
          <div className="action-card" onClick={() => navigate("/chat")}>
            <div className="icon-wrapper chat-icon">
              <MessageSquare size={32} />
            </div>
            <h3>Talk to AI</h3>
            <p>Start a conversation with your companion.</p>
          </div>

          <div className="action-card" onClick={() => navigate("/resources")}>
            <div className="icon-wrapper resource-icon">
              <BookOpen size={32} />
            </div>
            <h3>Resources</h3>
            <p>Explore articles, exercises, and guides.</p>
          </div>

          <div className="action-card" onClick={() => navigate("/profile")}>
            <div className="icon-wrapper profile-icon">
              <User size={32} />
            </div>
            <h3>Your Profile</h3>
            <p>Manage your settings and preferences.</p>
          </div>
        </div>

        <div className="daily-quote">
          <blockquote>
            "You don't have to control your thoughts. You just have to stop letting them control you."
          </blockquote>
          <cite>— Dan Millman</cite>
        </div>
      </div>
    </div>
  );
}
