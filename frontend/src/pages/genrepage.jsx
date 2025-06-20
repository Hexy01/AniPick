import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function GenrePage() {
  const { genreName } = useParams();
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const genreMap = {
    "action": 1,
    "adventure": 2,
    "comedy": 4,
    "drama": 8,
    "ecchi" : 9,
    "fantasy": 10,
    "harem": 35,
    "historical": 13,
    "josei": 43,
    "kids": 15,
    "romance": 22,
    "slice of life": 36,
    "isekai": 62,
    "horror": 14,
    "mystery": 7,
    "music": 19,
    "psychological": 40,
    "sci-fi": 24,
    "school": 23,
    "seinen": 42,
    "shounen": 27,
    "shoujo": 25,
    "ShoujoAi": 26,
    "Shounen": 27,
    "ShounenAi": 28,
    "Thriller": 41
    // Add more if needed
  };

  useEffect(() => {
    setAnimes([]);
    setPage(1);
    setHasMore(true);
    fetchGenreAnime(1);
  }, [genreName]);

  async function fetchGenreAnime(pageNum = 1) {
    const genreId = genreMap[genreName.toLowerCase()];
    if (!genreId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=score&sort=desc&limit=20&page=${pageNum}`
      );
      const data = await res.json();

      if (data?.data?.length > 0) {
        setAnimes((prev) => [...prev, ...data.data]);
        setPage(pageNum);
        setHasMore(data.pagination?.has_next_page);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to fetch genre animes", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  const handleLoadMore = () => {
    fetchGenreAnime(page + 1);
  };

  return (
    <>
      <div className="genre-page">
        <h1>{genreName} Anime <span>🍥</span></h1>

        {loading && animes.length === 0 ? (
          <p className="loading">Loading {genreName} anime... 🍡</p>
        ) : animes.length === 0 ? (
          <p className="loading">No animes found for this genre.</p>
        ) : (
          <>
            <div className="anime-grid">
              {animes.map((anime) => (
                <div key={anime.mal_id} className="anime-card">
                 <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="anime-card">
  <img src={anime.images.jpg.image_url} alt={anime.title} />
  <div className="info">
    <h3>{anime.title}</h3>
    <p>🎬 Episodes: {anime.episodes || "?"}</p>
    <p>⭐ Score: {anime.score || "N/A"}</p>
  </div>
</Link>

                </div>
              ))}
            </div>

            {hasMore && (
              <div className="load-more-container">
                <button className="load-more-btn" onClick={handleLoadMore} disabled={loading}>
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .genre-page {
          padding: 100px 5% 40px;
          background-color: #64416e;
          min-height: 100vh;
          color: white;
          font-family: 'Segoe UI', sans-serif;
          width: 100vw;
          overflow-x: hidden;
        }

        .genre-page h1 {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 30px;
          color: #FFB3C6;
          text-transform: capitalize;
        }

        .loading {
          text-align: center;
          font-size: 1.2rem;
          padding: 80px 0;
          color: #FF8BA7;
        }

        .anime-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .anime-card {
          background: #fff;
          border-radius: 16px;
          color: #2C2543;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease;
        }

        .anime-card:hover {
          transform: translateY(-5px);
        }

        .anime-card img {
          width: 100%;
          height: 280px;
          object-fit: cover;
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
          color: #FF5E84;
        }

        .info p {
          font-size: 0.85rem;
          color: #444;
        }

        .load-more-container {
          text-align: center;
          margin-top: 30px;
        }

        .load-more-btn {
          padding: 10px 20px;
          background-color: #FF8BA7;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
        }

        .load-more-btn:hover {
          background-color: #FF5E84;
        }

        .load-more-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .anime-card img {
            height: 220px;
          }
        }
      `}</style>
    </>
  );
}

export default GenrePage;
