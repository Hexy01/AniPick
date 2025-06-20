import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function AnimeList() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchAnimeList(currentPage);
  }, [currentPage]);

  async function fetchAnimeList(page) {
    setLoading(true);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?page=${page}`);
      const data = await res.json();

      if (data.data.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setAnimeList((prev) => [...prev, ...data.data]);
      }
    } catch (err) {
      console.error("Failed to fetch anime:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="anime-page">
        <div className="anime-grid">
          {animeList.map((anime) => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="anime-card">
              <img src={anime.images.jpg.image_url} alt={anime.title} />
              <div className="info">
                <h3>{anime.title}</h3>
                <p>🎬 Episodes: {anime.episodes || "?"}</p>
                <p>⭐ Score: {anime.score || "N/A"}</p>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="load-more-wrapper">
            <button className="load-more-btn" onClick={handleLoadMore} disabled={loading}>
              {loading ? "Loading..." : "Load More 🍡"}
            </button>
          </div>
        )}
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .anime-page {
          width: 100vw;
          overflow-x: hidden;
          background-color: #5a3c65;
          padding-top: 90px;
          min-height: 100vh;
        }

        .anime-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
          padding: 20px 24px 40px;
          width: 100%;
        }

        .anime-card {
          background: #fff;
          border-radius: 16px;
          text-decoration: none;
          color: #2C2543;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .anime-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 16px rgba(0, 0, 0, 0.15);
        }

        .anime-card img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        .info {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: #FF5E84;
        }

        .info p {
          font-size: 0.85rem;
          color: #444;
        }

        .load-more-wrapper {
          text-align: center;
          padding: 20px;
        }

        .load-more-btn {
          padding: 12px 24px;
          background-color: #FF8BA7;
          color: white;
          font-weight: bold;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .load-more-btn:hover {
          background-color: #FF5E84;
        }

        @media (max-width: 500px) {
          .anime-grid {
            padding: 16px;
            gap: 16px;
          }

          .info h3 {
            font-size: 0.9rem;
          }

          .info p {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}

export default AnimeList;
