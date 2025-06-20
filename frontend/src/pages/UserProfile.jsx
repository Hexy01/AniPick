import { useState } from "react";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("watchlist");

  const tabs = [
    { key: "watchlist", label: "📺 Watchlist" },
    { key: "reviews", label: "✍️ Reviews" },
    { key: "favorites", label: "🌟 Favorites" },
  ];

  const subWatchlistTabs = ["Watching", "Completed", "Plan to Watch"];

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <img
          src="https://i.pinimg.com/564x/c6/5d/b3/c65db3ff80e8a379b04b78c6e74cf34d.jpg"
          alt="Profile"
          className="profile-icon"
        />
        <h1 className="username">Hi, Sakura🌸</h1>
      </div>

      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "watchlist" && (
          <div className="sub-tab-list">
            {subWatchlistTabs.map((cat) => (
              <div key={cat} className="sub-tab">
                <h3>{cat}</h3>
                <p>💤 No anime added yet.</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="reviews-section">
            <p>✍️ You haven’t written any reviews yet!</p>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="favorites-section">
            <p>💖 No favorites added yet.</p>
          </div>
        )}
      </div>

      <style>{`
        .profile-wrapper {
          background-color: #2C2543;
          min-height: 100vh;
          padding: 100px 20px 40px;
          color: #FFEFF4;
          font-family: 'Segoe UI', sans-serif;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .profile-icon {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #FFB3C6;
          margin-bottom: 12px;
        }

        .username {
          font-size: 1.8rem;
          color: #FFB3C6;
        }

        .tab-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .tab-btn {
          background-color: #FF8BA7;
          color: #2C2543;
          border: none;
          padding: 10px 16px;
          font-weight: bold;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active,
        .tab-btn:hover {
          background-color: #f67290;
        }

        .tab-content {
          max-width: 1000px;
          margin: auto;
        }

        .sub-tab-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .sub-tab {
          background: #3D2E50;
          border-radius: 16px;
          padding: 20px;
        }

        .sub-tab h3 {
          color: #FFB3C6;
          margin-bottom: 10px;
        }

        .reviews-section,
        .favorites-section {
          background: #3D2E50;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
}

export default UserProfile;
