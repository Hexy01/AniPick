import { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${value}&limit=8`);
      setSuggestions(res.data.data);
      if (onSearchResults) {
        onSearchResults(res.data.data);
      }
    } catch (err) {
      console.error("Search error", err);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={handleInputChange}
        style={{
          padding: "0.6rem 1rem",
          width: "100%",
          borderRadius: "12px",
          border: "none",
          outline: "none",
          fontSize: "1rem",
        }}
      />

      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            width: "100%",
            background: "#2a253f",
            borderRadius: "8px",
            padding: "0.5rem",
            listStyle: "none",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((anime) => (
            <li
              key={anime.mal_id}
              onClick={() => window.location.href = `/anime/${anime.mal_id}`}
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #444",
                cursor: "pointer",
                color: "#ffb3c6",
              }}
            >
              {anime.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
