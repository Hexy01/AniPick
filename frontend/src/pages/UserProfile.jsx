import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState(() => {
    return localStorage.getItem("anipick-filter") || "All";
  });

  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/watchlist/${username}`);
      setWatchlist(res.data || []);
      console.log("📦 Watchlist data:", res.data);
    } catch (err) {
      console.error("❌ Failed to fetch watchlist", err);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const statuses = ["All", "Watching", "Completed", "Plan to Watch", "Favorites"];

const filteredAnime = watchlist.filter((entry) => {
  if (!entry.anime || !entry.anime.status) return false;

  if (filteredStatus === "All") return true;
  if (filteredStatus === "Favorites") return entry.anime.favorite === true;

  return entry.anime.status.toLowerCase() === filteredStatus.toLowerCase();
});


  const removeAnime = async (animeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/watchlist/${animeId}`);
      setWatchlist((prev) => prev.filter((a) => a._id !== animeId));
    } catch (err) {
      console.error("❌ Error removing anime", err);
    }
  };

  const styles = {
    page: {
      width: "100vw",
      minHeight: "100vh",
      backgroundColor: "#301738",
      padding: "5rem 2rem 2rem",
      color: "#fff",
      boxSizing: "border-box",
      overflowY: "auto",
    },
    header: {
      fontSize: "2.2rem",
      fontWeight: "bold",
      marginBottom: "2rem",
      color: "#ffb5d8",
      textAlign: "center",
      marginTop: "-15px",
    },
    tabs: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      marginBottom: "2.5rem",
      flexWrap: "wrap",
    },
    tabButton: (active) => ({
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      backgroundColor: active ? "#ff9ebc" : "#2a253f",
      color: active ? "#1e1b2e" : "#ccc",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      transform: active ? "scale(1.05)" : "scale(1)",
    }),
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: "1.2rem",
    },
    card: {
      backgroundColor: "#2a253f",
      borderRadius: "12px",
      padding: "0.75rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      transition: "transform 0.3s ease",
      cursor: "pointer",
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "0.5rem",
    },
    title: {
      fontSize: "0.95rem",
      textAlign: "center",
      fontWeight: "500",
      color: "#fff",
      marginBottom: "0.25rem",
    },
    removeBtn: {
      fontSize: "0.75rem",
      color: "#ff6b81",
      background: "none",
      border: "none",
      cursor: "pointer",
      marginTop: "4px",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Hey, {username}!</h1>

      <div style={styles.tabs}>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilteredStatus(status);
              localStorage.setItem("anipick-filter", status);
            }}
            style={styles.tabButton(filteredStatus === status)}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredStatus === "Favorites" && filteredAnime.length === 0 ? (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          No favorites yet! ❤️ Mark some anime as favorites to see them here.
        </p>
      ) : filteredAnime.length === 0 ? (
        <p
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "#ccc",
            textAlign: "center",
          }}
        >
          No anime found in this category!
        </p>
      ) : (
        <div style={styles.grid}>
          {filteredAnime.map((item) => {
            const anime = item.anime;

            return (
              <div
                key={item._id}
                style={styles.card}
                onClick={() => navigate(`/anime/${anime.id}`)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img src={anime.image} alt={anime.title} style={styles.image} />
                <h3 style={styles.title}>{anime.title}</h3>
                <button
                  style={styles.removeBtn}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card navigation
                    removeAnime(item._id);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
