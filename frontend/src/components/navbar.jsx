import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  const [username, setUsername] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const scrollToGenres = () => {
    const genreSection = document.getElementById("genre-section");
    if (genreSection) {
      genreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="left">
          <Link to="/" className="logo">AniPick 🍡</Link>
        </div>

        <div className="nav-links">
          <button className="search-toggle" onClick={toggleSearch}><FaSearch /></button>
          <div className="nav-link" onClick={scrollToGenres}>Genre</div>
          <div className="nav-link" onClick={() => navigate("/list")}>List</div>

          {username ? (
            <div className="profile-container">
              <button className="avatar-btn" onClick={toggleDropdown} title="Profile">🧁</button>
              {showDropdown && (
                <div className="dropdown">
                  <div className="dropdown-item">Hi, {username}!</div>
                  <div className="dropdown-item" onClick={() => navigate("/profile")}>View Profile</div>
                  <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      </nav>

      {showSearch && (
        <div className="search-container">
          <div className="search-wrapper">
            <button className="filter-btn">🔽</button>
            <input type="text" placeholder="Search anime..." />
            <button className="search-icon"><FaSearch /></button>
          </div>
        </div>
      )}

      <style>{`
        .navbar {
          background-color: #2C2543;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Segoe UI', sans-serif;
          position: fixed;
          top: 0;
          z-index: 1000;
          width: 100%;
        }

        .logo {
          font-size: 26px;
          font-weight: bold;
          color: #FFB3C6;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
          position: relative;
        }

        .nav-link {
          color: #FAEEE7;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
        }

        .nav-link:hover {
          color: #FF8BA7;
        }

        .login-btn {
          background-color: #FF8BA7;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: bold;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
        }

        .login-btn:hover {
          background-color: #FF5E84;
        }

        .search-toggle {
          background: none;
          border: none;
          color: #FAEEE7;
          font-size: 1.3rem;
          cursor: pointer;
        }

        .search-container {
          width: 100%;
          background-color: #2C2543;
          padding: 10px 20px;
          display: flex;
          justify-content: center;
          margin-top: 60px;
        }

        .search-wrapper {
          background-color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 700px;
          overflow: hidden;
        }

        .search-wrapper input {
          flex: 1;
          padding: 12px 16px;
          border: none;
          outline: none;
          font-size: 1rem;
        }

        .search-icon {
          background: none;
          border: none;
          padding: 0 16px;
          font-size: 1.2rem;
          color: #522258;
          cursor: pointer;
        }

        .filter-btn {
          background-color: #E5E5E5;
          border: none;
          padding: 0 12px;
          font-size: 1.2rem;
          height: 100%;
          cursor: pointer;
          color: #444;
        }

        .profile-container {
          position: relative;
        }

        .avatar-btn {
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #FFB3C6;
          display: flex;
          align-items: center;
        }

        .dropdown {
          position: absolute;
          top: 42px;
          right: 0;
          background-color: white;
          color: #2C2543;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          overflow: hidden;
          min-width: 150px;
          z-index: 10;
        }

        .dropdown-item {
          padding: 10px 16px;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .dropdown-item:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </>
  );
}

export default Navbar;
