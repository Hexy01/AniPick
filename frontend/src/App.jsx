import { useEffect, useState } from 'react';
import axios from './api/axios';

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [error, setError] = useState('');

 useEffect(() => {
  axios.get('/api/anime')
    .then(res => {
      console.log("Response data:", res.data);
      setAnimeList(res.data);
    })
    .catch(err => {
      console.error("Error fetching anime:", err);
      setError('Failed to fetch anime list');
    });
}, []);

  return (
    <div>
      <h1>AniPick Anime List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
  {Array.isArray(animeList) && animeList.map((anime, idx) => (
    <li key={idx}>{anime.title}</li>
  ))}
</ul>

    </div>
  );
}

export default App;
