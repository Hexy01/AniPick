import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AnimeList from "./pages/animelist"; 
import GenrePage from "./pages/genrepage";
import AnimeDetails from "./pages/animedetail";
import UserProfile from "./pages/UserProfile";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  return (
    <BrowserRouter>
      <Navbar username={username} setUsername={setUsername} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/signup" element={<Signup setUsername={setUsername} />} />
        <Route path="/list" element={<AnimeList />} />
        <Route path="/genre/:genreName" element={<GenrePage />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
