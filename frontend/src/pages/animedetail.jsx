// AnimeDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Plan to Watch");
  const [rating] = useState(10);
  const [isFavorite, setIsFavorite] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [isInList, setIsInList] = useState(false);

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

  useEffect(() => {
    if (username) fetchWatchlist();
  }, [username]);

  const fetchAnimeDetails = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
      setTimeout(() => setLoading(false), 150);
    } catch (err) {
      console.error("Failed to fetch anime details", err);
      setLoading(false);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/watchlist/${username}`);
      const entries = res.data || [];
      setWatchlist(entries);

      const entry = entries.find((item) => item.anime && item.anime.id == id);
      if (entry) {
        setIsInList(true);
        setSelectedStatus(entry.anime.status);
        setIsFavorite(entry.anime.favorite);
      } else {
        setIsInList(false);
        setIsFavorite(false);
      }
    } catch (err) {
      console.error("❌ Failed to fetch watchlist", err);
    }
  };

  const handleAddToList = async () => {
    if (!username) {
      toast.warn("⚠️ Please log in to add to your list.");
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
          rating,
          favorite: isFavorite,
        },
      };

      const res = await axios.post("http://localhost:5000/api/watchlist/add", payload);

      if (res.data.exists) {
        toast.info("You've already added this anime to your list.");
      } else if (res.data.success) {
        toast.success("Added to your " + selectedStatus + " list!");
        fetchWatchlist();
      } else {
        toast.error("❌ Something went wrong while adding the anime.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add anime to your list.");
    }
  };

  const handleRemoveFromList = async () => {
    try {
      const entry = watchlist.find((item) => item.anime && item.anime.id == id);
      if (!entry) {
        toast.warn("⚠️ Anime not found in your list.");
        return;
      }
      await axios.delete(`http://localhost:5000/api/watchlist/${entry._id}`);
      toast.success("❌ Removed from your list.");
      fetchWatchlist();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to remove anime from your list.");
    }
  };

  const handleFavoriteToggle = async () => {
    if (!username || !anime) {
      toast.warn("⚠️ User or Anime data is missing.");
      return;
    }

    try {
      const entry = watchlist.find((item) => item.anime && item.anime.id == anime.mal_id);

      if (!entry) {
        toast.error("❌ Anime not found in your list. Please add it first.");
        return;
      }

      const res = await axios.patch(
        `http://localhost:5000/api/watchlist/favorite/${username}/${anime.mal_id}`
      );

      if (res.data.success) {
        const newFavoriteStatus = res.data.favorite;
        setIsFavorite(newFavoriteStatus);
        toast(newFavoriteStatus ? "❤️ Added to your Favorites!" : "❌ Removed from your Favorites.");
      } else {
        toast.error("❌ Failed to update favorite status.");
      }
    } catch (err) {
      console.error("Favorite toggle failed", err);
      toast.error("❌ Failed to update favorite status.");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <ToastContainer position="top-center" autoClose={2500} />
        <div className="anime-details">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="content-wrapper">
              <div className="anime-img-wrapper">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="anime-img"
                />

                <div className="list-controls">
                  <label>Add to List:</label>
                  <div className="add-line">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="Watching">Watching</option>
                      <option value="Completed">Completed</option>
                      <option value="Plan to Watch">Plan to Watch</option>
                    </select>

                    <span
                      onClick={handleFavoriteToggle}
                      title="Toggle Favorite"
                      style={{
                        marginLeft: "10px",
                        marginTop: "10px",
                        cursor: "pointer",
                        fontSize: "1.3rem",
                      }}
                    >
                      {isFavorite ? (
                        <FaHeart color="#FF8BA7" />
                      ) : (
                        <FaRegHeart color="#FF8BA7" />
                      )}
                    </span>
                  </div>

                  {isInList ? (
                    <button className="add-btn-small" onClick={handleRemoveFromList}>
                      Remove from List
                    </button>
                  ) : (
                    <button className="add-btn-small" onClick={handleAddToList}>
                      Add Anime
                    </button>
                  )}
                </div>
              </div>

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
                    <span key={g.mal_id} className="genre-tag">
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

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
        .page-wrapper {
          background-color: #301738;
          min-height: 100vh;
          color: white;
          font-family: 'Segoe UI', sans-serif;
        }
        .anime-details {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px 40px;
        }
        .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        @media (min-width: 768px) {
          .content-wrapper {
            flex-direction: row;
          }
        }
        .anime-img-wrapper {
          flex-shrink: 0;
        }
        .anime-img {
          width: 180px;
          height: 260px;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }
        .details-info {
          flex: 1;
        }
        .details-info h1 {
          font-size: 2rem;
          margin-bottom: 10px;
          color: #FFB3C6;
        }
        .synopsis {
          margin: 10px 0 20px;
          line-height: 1.6;
          color: #eae1ed;
        }
        .details-meta p {
          margin: 6px 0;
        }
        .genres {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 15px 0;
        }
        .genre-tag {
          background-color: #FFB3C6;
          color: #2C2543;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: bold;
        }
        .list-controls {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .add-line {
          display: flex;
          align-items: center;
        }
        .list-controls select {
          margin-top: 10px;
          padding: 6px 10px;
          border-radius: 8px;
          border: none;
          background: #FFB3C6;
          color: #2C2543;
          font-weight: bold;
        }
        .add-btn-small {
          background-color: #FF8BA7;
          color: white;
          padding: 4px 12px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          font-size: 0.9rem;
          margin-top: 6px;
          cursor: pointer;
          width: fit-content;
        }
        .trailer-section {
          margin-top: 40px;
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
      `}</style>
    </>
  );
}

export default AnimeDetails;
