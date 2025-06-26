import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
    };
    fetchTrendingAnime();
  }, []);
  const [upcomingAnime, setUpcomingAnime] = useState([]);

useEffect(() => {
  const fetchUpcomingAnime = async () => {
    try {
      const res = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
      const data = await res.json();
      setUpcomingAnime(data.data.slice(0, 12));
    } catch (err) {
      console.error("Failed to fetch upcoming anime:", err);
    }
  };
  fetchUpcomingAnime();
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

  const handleCardClick = (mal_id) => {
    navigate(`/anime/${mal_id}`);
  };

  const genreList = [
    "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Harem",
    "Horror", "Isekai", "Josei", "Kids", "Music", "Mystery", "Psychological",
    "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai",
    "Shounen", "Shounen Ai", "Slice of Life", "Thriller"
  ];
  const animeFacts = [
  "One Piece has over 1000 episodes and counting.",
  "Naruto was originally supposed to be about ramen, not ninjas!",
  "Attack on Titan was almost canceled before gaining traction.",
  "Death Note was banned in several countries for inspiring real-life notebooks.",
  "Spirited Away won an Oscar and remains Japan's highest-grossing film until 2020.",
  "Goku’s voice actor in Japan is a woman: Masako Nozawa.",
  "My Hero Academia was inspired by Western superheroes like Spider-Man.",
  "Sailor Moon helped popularize the magical girl genre globally.",
  "The anime 'Your Name' became the highest-grossing anime movie worldwide (until Demon Slayer Mugen Train)."
];

const [currentFactIndex, setCurrentFactIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % animeFacts.length);
  }, 5000); // Change every 5 seconds

  return () => clearInterval(interval);
}, []);


  return (
    <>
      <div className="homepage">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background"></div>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>AniPick</h1>
              <p>Find your next binge</p>
              <Link to="/signup" className="cta-button">Join the Club</Link>
            </div>
          </div>
        </section>

{/* Featured Section: Trending + Upcoming */}
<section className="featured">
  <div className="fade-top"></div>

  {/* Trending Picks */}
  <h2 className="trending-title">✨ Trending Picks</h2>
  <div className="anime-cards">
    {trendingAnime.map((anime) => (
      <div
        className="anime-card"
        key={anime.mal_id}
        onClick={() => handleCardClick(anime.mal_id)}
      >
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

  {/* Upcoming Anime */}
  <h2 className="trending-title" style={{ marginTop: "60px" }}>🔮 Upcoming Anime</h2>
  <div className="anime-cards">
    {upcomingAnime.map((anime) => (
      <div
        className="anime-card"
        key={anime.mal_id}
        onClick={() => handleCardClick(anime.mal_id)}
      >
        <div className="card-img-wrapper">
          <img src={anime.images.jpg.image_url} alt={anime.title} />
        </div>
        <div className="card-details">
          <h3>{anime.title}</h3>
          <p>{anime.synopsis?.substring(0, 80) || "No description available..."}</p>
          <span className="score">📅 {anime.aired?.from?.slice(0, 10) || "TBA"}</span>
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

        {/* Anime Trivia Section */}
<section className="trivia-section">
  <h2>💡 Did You Know?</h2>
  <div className="trivia-carousel">
    <div className="trivia-slide">
      {animeFacts[currentFactIndex]}
    </div>
  </div>
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
  top: 30px;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url("https://w.wallhaven.cc/full/8x/wallhaven-8xvmry.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.65);
  z-index: 1;

  /* Fading edges using mask */
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%),
  linear-gradient(to bottom, black 85%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%),
  linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-composite: destination-in;
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
  margin-top: 70px;
  margin-left: 0;
  max-width: 500px;
  text-align: left;
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
          padding: 12px 16px;
          background-color: #ff8ba7;
          color: white;
          font-weight: bold;
          border-radius: 14px;
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
  padding: 100px 4% 60px;
  width: 100%;
  background: linear-gradient(to bottom, #1e1e2f 0%, #2b1b2d 40%, #35213b 100%);
}

        .trending-title {
          font-size: 2.2rem;
          margin-top: -60px;
          margin-bottom: 50px;
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
          cursor: pointer;
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
  padding: 60px 5%;
  width: 100%;
  color: #eae1ed;
  background: linear-gradient(
    to bottom,
    #2e1b32 0%,       /* Start - dark purple from featured */
    #2b1a30 40%,
    #28192e 70%,
    #25172c 100%       /* End - slightly deeper tone */
  );
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
.trivia-section {
  padding: 80px 5%;
  background-color: #2d1b33;
  color: #ffe3f1;
  text-align: center;
}

.trivia-section h2 {
  font-size: 2.2rem;
  margin-bottom: 30px;
}

.trivia-carousel {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  position: relative;
}

.trivia-slide {
  background: linear-gradient(135deg, #ffb3c6, #ff6f91);
  color: #2d1b33;
  padding: 20px 30px;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: bubbleFadeIn 0.6s ease-in-out;
  transition: transform 0.3s ease;
  max-width: 90%;
  text-align: center;
  line-height: 1.5;
}

@keyframes bubbleFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
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
