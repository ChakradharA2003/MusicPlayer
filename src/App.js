// App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar"; // Assuming Navbar is updated
import SidebarDesktop from "./components/SidebarDesktop/SidebarDesktop"; // Assuming SidebarDesktop is updated
import Home from "./pages/Home/Home"; // Assuming Home is updated
import Favorites from "./pages/Favorites/Favorites"; // Assuming Favorites is updated
import RecentlyPlayed from "./pages/RecentlyPlayed/RecentlyPlayed"; // Assuming RecentlyPlayed is updated
import Player from "./components/Player/Player"; // Assuming Player is updated
import './App.css'; // Import the main App CSS

const App = () => {
  const [activePage, setActivePage] = useState("home");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong, setCurrentSong] = useState({
    url: "",
    title: "",
    artist: "",
    thumbnail: "",
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (url, title, artist, thumbnail) => {
    setCurrentSong({ url, title, artist, thumbnail });
    setIsPlaying(true);
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const renderPage = () => {
    switch (activePage) {
      case "home":
        // Pass necessary props down
        return <Home searchResults={searchResults} onPlay={playSong} />;
      case "favorites":
        return <Favorites onPlay={playSong} />;
      case "recentlyPlayed":
        return <RecentlyPlayed onPlay={playSong} />;
      default:
        return <Home searchResults={searchResults} onPlay={playSong} />;
    }
  };

  return (
    // Use specific class names defined in App.css
    <div className="app-container">
      {/* Navbar remains fixed at the top */}
      <Navbar setSearchResults={setSearchResults} setActivePage={setActivePage} />

      {/* Main content area layout */}
      <div className="main-layout">
        {/* Sidebar (Desktop) */}
        <div className="sidebar-desktop-wrapper">
          {/* SidebarDesktop component goes here, ensure it uses its own CSS */}
          <SidebarDesktop setActivePage={setActivePage} />
        </div>

        {/* Page Content Area */}
        <main className="main-content">
           {/* Optional: Add a container to constrain content width */}
           <div className="content-inner-wrapper">
             {renderPage()}
           </div>
        </main>
      </div>

      {/* Player remains fixed at the bottom */}
      <div className="player-wrapper">
         {/* Player component goes here, ensure it uses its own CSS */}
         <Player
           url={currentSong.url}
           isPlaying={isPlaying}
           onPlay={handlePlay}
           onPause={handlePause}
           thumbnail={currentSong.thumbnail}
           title={currentSong.title}
           artist={currentSong.artist}
         />
      </div>
    </div>
  );
};

export default App;