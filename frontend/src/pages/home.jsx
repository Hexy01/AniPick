import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrendingAnime();
  }, []);

  const fetchTrendingAnime = async () => {
    try {
      const res = await fetch("https://api.jikan.moe/v4/top/anime");
      const data = await res.json();
      setTrendingAnime(data.data.slice(0, 4));
    } catch (err) {
      console.error("Failed to fetch trending anime:", err);
    }
  };

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.toLowerCase()}`);
  };

  return (
    <>
      <div className="homepage">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-text">
            <h1>AniPick 🍥</h1>
            <p> Save, Track and Find your next binge</p>
            <Link to="/signup" className="cta-btn">Join the Club</Link>
          </div>
          <div className="hero-img">
            <img src="https://i.pinimg.com/736x/51/2c/9a/512c9a9bfd71ae7ab6b583dca74c318f.jpg" alt="anime hero" />
          </div>
        </section>

        {/* Featured Anime Section */}
        <section className="featured">
          <h2>✨ Trending Picks</h2>
          <div className="anime-cards">
            {trendingAnime.map((anime) => (
              <div className="anime-card" key={anime.mal_id}>
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <h3>{anime.title}</h3>
                <p>{anime.synopsis?.substring(0, 80) || "No description available..."}</p>
                <p>⭐ {anime.score || "N/A"}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Genre Section */}
        <section id="genre-section" className="genre-section">
          <h2>Find Your Favorite Genre</h2>
          <div className="genre-grid">
            {["Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Harem", "Horror", "Isekai", "Josei", "Kids", "Music" , "Mystery","Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life","Thriller"].map((genre, idx) => (
              <div key={idx} className="genre-item" onClick={() => handleGenreClick(genre)}>{genre}</div>
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

        .hero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 80px 5%;
          background: #553e5c;
          width: 100%;
        }

        .hero-text {
          max-width: 50%;
        }

        .hero-text h1 {
          font-size: 3.5rem;
          margin-bottom: 10px;
        }

        .hero-text p {
          font-size: 1.2rem;
          margin-bottom: 20px;
        }

        .cta-btn {
          padding: 12px 24px;
          background-color: #FF6F91;
          color: white;
          border: none;
          border-radius: 30px;
          text-decoration: none;
          font-weight: bold;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .hero-img img {
          width: 500px;
          height: 500px;
          border-radius: 0px;
        }

        .featured {
          padding: 60px 5%;
          background-color: #4f3d54;
          width: 100%;
        }

        .featured h2 {
          font-size: 2.2rem;
          margin-bottom: 30px;
          text-align: center;
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
          box-shadow: 0 6px 12px rgba(0,0,0,0.05);
        }

        .anime-card img {
          width: 100%;
          border-radius: 10px;
          margin-bottom: 10px;
        }

        .genre-section {
          background-color: #44304a;
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
          background-color:  #553e5c; ;
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
          background-color: #FFE5EC;
          font-size: 0.9rem;
          color: #6B4E71;
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default Home;