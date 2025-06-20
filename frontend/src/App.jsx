import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AnimeList from "./pages/animelist"; 
import GenrePage from "./pages/genrepage";
import AnimeDetails from "./pages/animedetail"; 
function App() {
  
  return (
    <BrowserRouter>
      <Navbar /> {/* ✅ Only render it once here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list" element={<AnimeList />} />
        <Route path="/genre/:genreName" element={<GenrePage />} />
         <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
