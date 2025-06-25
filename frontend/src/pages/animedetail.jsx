import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Plan to Watch");
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchAnimeDetails();
  }, [id]);

  useEffect(() => {
    if (anime) {
      const timeout = setTimeout(() => setShowTrailer(true), 400);
      return () => clearTimeout(timeout);
    }
  }, [anime]);

  async function fetchAnimeDetails() {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
      setTimeout(() => setLoading(false), 150);
    } catch (err) {
      console.error("Failed to fetch anime details", err);
      setLoading(false);
    }
  }

  async function handleAddToList() {
    if (!username) {
  setMessage("Please log in to add to your list.");
  return;
}
    try {
      const payload = {
        username,
        anime: {
          id,
          title: anime.title,
          image: anime.images.jpg.image_url,
          status: selectedStatus,
        },
      };

      const res = await axios.post("http://localhost:5000/api/watchlist/add", payload);
      setMessage("✅ Added to your " + selectedStatus + " list!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add anime to your list.");
    }
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="anime-details">
          <div className={`details-grid ${!loading ? "loaded" : ""}`}>
            {loading ? (
              <>
                <div className="anime-img skeleton-box" />
                <div className="details-info">
                  <h1 className="skeleton-box short" />
                  <p className="skeleton-box" />
                  <p className="skeleton-box" />
                  <div className="details-meta">
                    <p className="skeleton-box" />
                    <p className="skeleton-box" />
                  </div>
                  <div className="genres">
                    <span className="skeleton-box tiny" />
                    <span className="skeleton-box tiny" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-img" />

                <div className="details-info">
                  <h1>{anime.title}</h1>
                  <p className="synopsis">{anime.synopsis || "No synopsis available."}</p>

                  <div className="details-meta">
                    <p><strong>Episodes:</strong> {anime.episodes || "?"}</p>
                    <p><strong>Score:</strong> ⭐ {anime.score || "N/A"}</p>
                    <p><strong>Status:</strong> {anime.status}</p>
                    <p><strong>Type:</strong> {anime.type}</p>
                    <p><strong>Rating:</strong> {anime.rating}</p>
                    <p><strong>Duration:</strong> {anime.duration}</p>
                  </div>

                  <div className="genres">
                    {anime.genres.map((g) => (
                      <span key={g.mal_id} className="genre-tag">{g.name}</span>
                    ))}
                  </div>

                  {/* 🚀 Add to List Section Starts */}
                  <div style={{ marginTop: "20px" }}>
                    <label style={{ marginRight: "10px", fontWeight: "500" }}>Add to List:</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "8px",
                        marginRight: "10px",
                        border: "none",
                        background: "#FFB3C6",
                        color: "#2C2543",
                        fontWeight: "bold"
                      }}
                    >
                      <option value="Watching">Watching</option>
                      <option value="Completed">Completed</option>
                      <option value="Plan to Watch">Plan to Watch</option>
                    </select>
                    <button
                      onClick={handleAddToList}
                      style={{
                        backgroundColor: "#FF8BA7",
                        color: "white",
                        padding: "6px 16px",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                    >
                      Add to List
                    </button>
                    {message && (
                      <p style={{ marginTop: "8px", color: "#FFB3C6", fontWeight: 500 }}>
                        {message}
                      </p>
                    )}
                  </div>
                  {/* 🚀 Add to List Section Ends */}
                </div>
              </>
            )}
          </div>

          {!loading && anime?.trailer?.embed_url && showTrailer && (
            <div className="trailer-section">
              <h2>🎥 Trailer</h2>
              <iframe
                src={anime.trailer.embed_url}
                title="Anime Trailer"
                allowFullScreen
                className="trailer"
              ></iframe>
            </div>
          )}
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        .page-wrapper {
          background-color: #301738;
          width: 100%;
          min-height: 100vh;
        }

        .anime-details {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 20px 40px;
          color: white;
          font-family: 'Segoe UI', sans-serif;
        }

        .loading {
          text-align: center;
          font-size: 1.2rem;
          padding: 80px 0;
          color: #FF8BA7;
        }

        .details-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .details-grid.loaded {
          opacity: 1;
        }

        .anime-img {
          width: 240px;
          height: 340px;
          max-width: 200px;
          border-radius: 16px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
          margin-bottom: 20px;
        }

        .details-info h1 {
          font-size: 2rem;
          margin-bottom: 10px;
          color: #FFB3C6;
        }

        .synopsis {
          margin: 10px 0 20px;
          font-size: 1rem;
          line-height: 1.5;
          color: #eae1ed;
        }

        .details-meta p {
          margin: 6px 0;
        }

        .genres {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }

        .genre-tag {
          background-color: #FFB3C6;
          color: #2C2543;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: bold;
        }

        .trailer-section {
          margin-top: 40px;
          transition: opacity 0.3s ease;
        }

        .trailer-section h2 {
          margin-bottom: 16px;
          font-size: 1.5rem;
          color: #FF8BA7;
        }

        .trailer {
          width: 100%;
          max-width: 700px;
          height: 400px;
          border: none;
          border-radius: 10px;
        }

        /* Skeleton Loading */
        .skeleton-box {
          background: linear-gradient(90deg, #bbb, #ddd, #bbb);
          background-size: 200% 100%;
          animation: fadeIn 0.2s ease-in, shimmer 1.2s infinite;
          border-radius: 8px;
          margin-bottom: 10px;
          height: 20px;
        }

        .skeleton-box.short {
          width: 40%;
          height: 32px;
        }

        .skeleton-box.tiny {
          width: 80px;
          height: 20px;
        }

        .anime-img.skeleton-box {
          width: 240px;
          height: 340px;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (min-width: 768px) {
          .details-grid {
            flex-direction: row;
            gap: 40px;
          }

          .anime-img {
            flex-shrink: 0;
            width: 240px;
            height: 340px;
          }

          .details-info {
            flex: 1;
          }
        }
      `}</style>
    </>
  );
}

export default AnimeDetails;
