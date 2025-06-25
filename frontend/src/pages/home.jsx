import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

function Home() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
 const fetchTrendingAnime = async () => {
  try {
    const res = await fetch("https://api.jikan.moe/v4/seasons/now");
    const data = await res.json();
    setTrendingAnime(data.data.slice(0, 12));
  } catch (err) {
    console.error("Failed to fetch trending anime:", err);
  }
};    fetchTrendingAnime();
  }, []);

  useEffect(() => {
    const scrollTarget = searchParams.get("scroll");
    if (scrollTarget === "genre") {
      const section = document.getElementById("genre-section");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 600);
      }
    }
  }, [searchParams]);

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.toLowerCase()}`);
  };

  const genreList = [
    "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Harem",
    "Horror", "Isekai", "Josei", "Kids", "Music", "Mystery", "Psychological",
    "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai",
    "Shounen", "Shounen Ai", "Slice of Life", "Thriller"
  ];

  return (
    <>
      <div className="homepage">
        {/* Hero Section */}
        <section className="hero-section">
          <img
            src="
https://wallpapercat.com/w/middle-retina/8/a/c/182832-2339x1654-desktop-hd-demon-slayer-kimetsu-no-yaiba-wallpaper-photo.jpg
"
            alt="anime background"
            className="hero-background"
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>AniPick</h1>
              <p>Save, Track and Find your next binge</p>
              <Link to="/signup" className="cta-button">Join the Club</Link>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="featured">
          <div className="fade-top"></div>
          <h2 className="trending-title">✨ Trending Picks</h2>
          <div className="anime-cards">
            {trendingAnime.map((anime) => (
              <div className="anime-card" key={anime.mal_id}>
                <div className="card-img-wrapper">
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                </div>
                <div className="card-details">
                  <h3>{anime.title}</h3>
                  <p>{anime.synopsis?.substring(0, 80) || "No description available..."}</p>
                  <span className="score">⭐ {anime.score || "N/A"}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Genre Section */}
        <section className="genre-section" id="genre-section">
          <h2>Find Your Favorite Genre</h2>
          <div className="genre-grid">
            {genreList.map((genre, idx) => (
              <div
                key={idx}
                className="genre-item"
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact">
          <h2>📬 Leave a Message</h2>
          <br />
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message..." rows="4" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2025 AniPick. All rights reserved. Made with 💖 by Hexy01.</p>
        </footer>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .homepage {
          font-family: 'Segoe UI', sans-serif;
          background-color: #553e5c;
          color: #eae1ed;
          width: 100vw;
        }

        .hero-section {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          background: #1e1e2f;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 120vh;
          width: 100vw;
          object-fit: cover;
          z-index: 1;
          filter: brightness(0.65);
          mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
        }

        .hero-overlay {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1280px;
          padding: 2rem;
          box-sizing: border-box;
        }

        .hero-content {
          margin-right: 8%;
          max-width: 500px;
          text-align: right;
          color: #fff;
          animation: fadeInUp 1s ease-in-out;
        }

        .hero-content h1 {
          font-size: 3.2rem;
          color: #ffe3f1;
          margin-bottom: 0.5rem;
        }

        .hero-content p {
          font-size: 1.4rem;
          color: #fcd5ec;
          margin-bottom: 1.5rem;
        }

        .cta-button {
          padding: 12px 24px;
          background-color: #ff8ba7;
          color: white;
          font-weight: bold;
          border-radius: 8px;
          text-decoration: none;
          font-size: 1.1rem;
          transition: background 0.3s ease;
        }

        .cta-button:hover {
          background-color: #ff5e84;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .featured {
          padding: 100px 5% 60px;
          background: #35213b;
          width: 100%;
        }

        .trending-title {
          font-size: 2.2rem;
          margin-bottom: 30px;
          text-align: center;
          color: #ffe3f1;
        }

        .anime-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }

        .anime-card {
          background-color: #26142b;
          border-radius: 16px;
          padding: 16px;
          text-align: center;
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
          transition: transform 0.3s ease;
        }

        .anime-card:hover {
          transform: translateY(-5px);
        }

        .anime-card img {
          width: 100%;
          border-radius: 10px;
          margin-bottom: 10px;
        }

        .genre-section {
          background-color: #2d1b33;
          color: #eae1ed;
          padding: 60px 5%;
          width: 100%;
        }

        .genre-section h2 {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 30px;
        }

        .genre-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 16px;
          justify-items: center;
        }

        .genre-item {
          font-size: 1.1rem;
          color: #eae1ed;
          font-weight: bold;
          cursor: pointer;
        }

        .about, .contact {
          padding: 60px 5%;
          background-color: #35213b;
          text-align: center;
          width: 100%;
        }

        .about p {
          max-width: 700px;
          margin: auto;
          font-size: 1.1rem;
        }

        .contact form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 400px;
          margin: 0 auto;
        }

        .contact input, .contact textarea {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
        }

        .contact button {
          background-color: #FF6F91;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-weight: bold;
        }

        .footer {
          padding: 20px;
          text-align: center;
          background-color: #403045;
          font-size: 0.9rem;
          color: #FFB3C6;
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default Home;
