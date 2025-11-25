import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getResources } from "../../lib/api";
import Navbar from "../../components/navbar/NavBar";
import "./ResourcesPage.css";
import { Search, BookOpen, Video, Headphones, Activity, Phone } from "lucide-react";

export default function ResourcesPage() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["resources", category, search],
    queryFn: () => getResources({ category, search }),
  });

  const resources = data?.data?.resources || [];

  const categories = [
    { id: "", label: "All" },
    { id: "anxiety", label: "Anxiety" },
    { id: "depression", label: "Depression" },
    { id: "stress", label: "Stress" },
    { id: "sleep", label: "Sleep" },
    { id: "mindfulness", label: "Mindfulness" },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "video": return <Video size={20} />;
      case "audio": return <Headphones size={20} />;
      case "exercise": return <Activity size={20} />;
      case "hotline": return <Phone size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  return (
    <div className="resources-page">
      <Navbar />
      <div className="resources-content">
        <div className="resources-header">
          <h1>Mental Health Resources</h1>
          <p>Curated tools and guides to support your journey.</p>
        </div>

        <div className="filters-section">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${category === cat.id ? "active" : ""}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>Failed to load resources. Please try again.</p>
          </div>
        ) : (
          <div className="resources-grid">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <div key={resource._id} className="resource-card">
                  <div className="resource-type">
                    {getIcon(resource.type)}
                    <span>{resource.type}</span>
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <div className="resource-footer">
                    <span className={`difficulty ${resource.difficulty}`}>
                      {resource.difficulty}
                    </span>
                    <a href={resource.content} target="_blank" rel="noopener noreferrer" className="access-btn">
                      Access Resource
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No resources found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
