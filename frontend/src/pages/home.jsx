// File: src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to AniPick</h1>
      <p className="text-xl mb-8">Discover, review, and track your favorite anime</p>
      <Link to="/anime" className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-100 transition">
        Explore Anime
      </Link>
    </div>
  );
}
