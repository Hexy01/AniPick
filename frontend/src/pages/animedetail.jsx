import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnimeDetails();
  }, [id]);

  async function fetchAnimeDetails() {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
    } catch (err) {
      console.error("Failed to fetch anime details", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="loading">Loading anime details... 🍡</p>;
  if (!anime) return <p className="loading">Anime not found.</p>;

  return (
    <>
      <div className="page-wrapper">
        <div className="anime-details">
          <div className="details-grid">
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
            </div>
          </div>

          {anime.trailer?.embed_url && (
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
          background-color: #64416e;
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
