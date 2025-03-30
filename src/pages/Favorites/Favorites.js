// Favorites.js
import React, { useState, useEffect } from "react";
import SongCard from "../../components/SongCard/SongCard"; // Assuming SongCard is updated
import './Favorites.css'; // Import the CSS

const Favorites = ({ onPlay }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorite songs from localStorage & handle updates
  useEffect(() => {
    const loadFavorites = () => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    };

    loadFavorites();

    // Optional: Add event listener to update if favorites change in another tab/window
    const handleStorageChange = (event) => {
        if (event.key === 'favorites') {
            loadFavorites();
        }
    };
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };

  }, []); // Run only once on mount

  return (
    // Use class names defined in Favorites.css (similar to Home.css)
    <div className="favorites-page-container">
      <h2 className="page-title">❤️ Favorite Songs</h2>
      {favorites.length === 0 ? (
        <p className="empty-message">No favorite songs added yet!</p>
      ) : (
        // Use the same grid layout as Home
        <div className="song-grid-container">
          {favorites.map((song, index) => (
            <SongCard
              key={song.id || index} // Use song.id if available, fallback to index
              id={song.id}
              title={song.title}
              artist={song.artist}
              thumbnail={song.thumbnail}
              url={song.url} // Assuming URL is stored correctly in localStorage
              onPlay={onPlay} // Pass the onPlay function
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;