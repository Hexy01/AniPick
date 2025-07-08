import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar({ username, setUsername }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
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
    if (location.pathname === "/") {
      const genreSection = document.getElementById("genre-section");
      if (genreSection) {
        genreSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/?scroll=genre");
    }
  };

  const triggerSearch = () => {
    if (!searchQuery.trim()) return;
    const encoded = encodeURIComponent(searchQuery.trim());
    navigate(`/list?search=${encoded}`);
    setShowSearch(false);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      triggerSearch();
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length === 0) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=5`);
        const data = await res.json();
        setSuggestions(data.data || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Live suggestions failed", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  return (
    <>
      <nav className="navbar">
        <div className="left">
        <Link
  to="/"
  className="logo"
  onClick={(e) => {
    if (location.pathname === "/") {
      e.preventDefault(); // ⛔ stop default behavior
      window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ scroll to top
    }}}>AniPick🍡</Link>
        </div>

        <div className="nav-links">
          <button className="search-toggle" onClick={toggleSearch}><FaSearch /></button>
          <div className="nav-link" onClick={scrollToGenres}>Genre</div>
          <div className="nav-link" onClick={() => navigate("/list")}>List</div>

          {username ? (
            <div className="profile-container">
              <button className="avatar-btn" onClick={toggleDropdown} title="Profile" ref={avatarRef}>
                <FaUserCircle />
              </button>
              {showDropdown && (
                <div className="dropdown" ref={dropdownRef}>
                  <div className="dropdown-item">Hi, {username}!</div>
                  <div className="dropdown-item" onClick={() => { setShowDropdown(false); navigate("/profile"); }}>Watchlist</div>
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
            <button className="filter-btn"> 🔽 </button>
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button className="search-icon" onClick={triggerSearch}><FaSearch /></button>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((anime) => (
                <li
                  key={anime.mal_id}
                  onClick={() => {
                    navigate(`/anime/${anime.mal_id}`);
                    setShowSearch(false);
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                >
                  {highlightMatch(anime.title, searchQuery)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <style>{`
        .navbar {
          background-color: #220a29;
          padding: 8px 25px;
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
          margin-left: -35px;
        }

        .nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
          position: relative;
          margin-left: -40px;
          margin-right: 10px;
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
          position: fixed;
          top: 50px;
          left: 0;
          width: 100%;
          z-index: 1001;
          background-color: #220a29;
          padding: 10px 30px;
          border-radius: 0;
        }

        .search-wrapper {
          background-color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          width: 100%;
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
          padding: 8px 12px;
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
          background-color: #cfb1e3;
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
          background-color: #bc7ee6;
        }

        .suggestions-dropdown {
          width: 100%;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 0 0 8px 8px;
          list-style: none;
          padding: 0;
          margin: 4px 0 0 0;
          max-height: 300px;
          overflow-y: auto;
        }

        .suggestions-dropdown li {
          padding: 10px 16px;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .suggestions-dropdown li:hover {
          background-color: #ffe0ea;
        }

        .suggestions-dropdown mark {
          background-color: #ffc6db;
          font-weight: bold;
          padding: 0 2px;
        }
      `}</style>
    </>
  );
}

export default Navbar;
