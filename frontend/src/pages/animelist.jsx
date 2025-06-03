// File: src/pages/AnimeList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function AnimeList() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    axios.get('/api/anime')
      .then(res => setAnimeList(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">Anime List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animeList.length ? animeList.map(anime => (
          <Link to={`/anime/${anime._id}`} key={anime._id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition">
            <img src={anime.imageUrl || 'https://via.placeholder.com/150'} alt={anime.title} className="w-full h-48 object-cover rounded-lg mb-3" />
            <h3 className="text-xl font-semibold text-purple-800">{anime.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{anime.synopsis}</p>
          </Link>
        )) : (
          <p className="text-center col-span-full text-gray-500">No anime found.</p>
        )}
      </div>
    </div>
  );
}
