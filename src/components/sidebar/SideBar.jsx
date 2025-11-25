import { useState } from "react";
import { Menu, X, Home, MessageSquare, BookOpen, User } from "lucide-react";
import './SideBar.css';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar-container">
      <button onClick={toggleSidebar} className="sidebar-toggle">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`sidebar ${open ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2>Menu</h2>
            <button onClick={toggleSidebar} className="sidebar-close">
              <X size={24} />
            </button>
          </div>

          <div className="sidebar-menu">
            <SidebarItem icon={<Home size={24} />} label="Home" onClick={toggleSidebar} />
            <SidebarItem icon={<MessageSquare size={24} />} label="Chat" onClick={toggleSidebar} />
            <SidebarItem icon={<User size={24} />} label="Profile" onClick={toggleSidebar} />
          </div>
        </div>
      </div>

      {open && (
        <div onClick={toggleSidebar} className="sidebar-overlay" />
      )}
    </div>
  );
}

function SidebarItem({ icon, label, onClick }) {
  return (
    <button className="sidebar-item" onClick={onClick}>
      <span className="sidebar-icon">{icon}</span>
      <span className="sidebar-label">{label}</span>
    </button>
  );
}