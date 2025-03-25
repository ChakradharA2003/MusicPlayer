// import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Home from "./pages/Home/Home";
// import Favorites from "./pages/Favorites/Favorites";
// import RecentlyPlayed from "./pages/RecentlyPlayed/RecentlyPlayed";
// import Player from "./components/Player";

// const App = () => {
//   const [activePage, setActivePage] = useState("home");
//   const [searchResults, setSearchResults] = useState([]);
//   const [currentSong, setCurrentSong] = useState({
//     url: "",
//     title: "",
//     artist: "",
//     thumbnail: "",
//   });
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Handle song play
//   const playSong = (url, title, artist, thumbnail) => {
//     setCurrentSong({ url, title, artist, thumbnail });
//     setIsPlaying(true);
//   };

//   // Handle play/pause toggle
//   const handlePlay = () => setIsPlaying(true);
//   const handlePause = () => setIsPlaying(false);

//   // Render appropriate page based on state
//   const renderPage = () => {
//     switch (activePage) {
//       case "home":
//         return <Home searchResults={searchResults} onPlay={playSong} />;
//       case "favorites":
//         return <Favorites onPlay={playSong} />;
//       case "recentlyPlayed":
//         return <RecentlyPlayed onPlay={playSong} />;
//       default:
//         return <Home searchResults={searchResults} onPlay={playSong} />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-spotifyBlack">
//       <Sidebar setActivePage={setActivePage} />
//       <div className="flex-1 overflow-y-auto">
//         <Navbar setSearchResults={setSearchResults} setActivePage={setActivePage} />
//         {renderPage()}
//       </div>
//       <Player
//         url={currentSong.url}
//         isPlaying={isPlaying}
//         onPlay={handlePlay}
//         onPause={handlePause}
//         thumbnail={currentSong.thumbnail}
//         title={currentSong.title}
//         artist={currentSong.artist}
//       />
//     </div>
//   );
// };

// export default App;

// App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import SidebarDesktop from "./components/SidebarDesktop"; // Desktop Sidebar
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import RecentlyPlayed from "./pages/RecentlyPlayed/RecentlyPlayed";
import Player from "./components/Player";

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

  // Handle song play
  const playSong = (url, title, artist, thumbnail) => {
    setCurrentSong({ url, title, artist, thumbnail });
    setIsPlaying(true);
  };

  // Handle play/pause toggle
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  // Render appropriate page based on state
  const renderPage = () => {
    switch (activePage) {
      case "home":
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
    <div className="bg-spotifyBlack min-h-screen">
      {/* Navbar */}
      <Navbar setSearchResults={setSearchResults} setActivePage={setActivePage} />

      {/* Main Flex Layout */}
      <div className="flex mt-20">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block">
          <SidebarDesktop setActivePage={setActivePage} />
        </div>

        {/* Main Content on Right */}
        <div className="flex-1 md:ml-64 p-4 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{renderPage()}</div>
        </div>
      </div>

      {/* Music Player at Bottom */}
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
  );
};

export default App;
