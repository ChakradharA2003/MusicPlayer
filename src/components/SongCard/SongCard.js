import React, { useState, useEffect } from "react";
import './SongCard.css'; // Import the CSS file

const SongCard = ({ id, title, artist, thumbnail, onPlay, url }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, [id]); // Dependency array remains the same

  const checkIfFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isSongFavorite = savedFavorites.some((song) => song.id === id);
    setIsFavorite(isSongFavorite);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card's onClick from firing
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = savedFavorites.filter((song) => song.id !== id);
    } else {
      updatedFavorites = [
        ...savedFavorites,
        { id, title, artist, thumbnail, url }, // Ensure all needed data is saved
      ];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite); // Update state
  };

  const addToRecentlyPlayed = () => {
    const playedSongs =
      JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    const updatedPlayedSongs = [
      { id, title, artist, thumbnail, url }, // Ensure all needed data is saved
      ...playedSongs.filter((song) => song.id !== id),
    ].slice(0, 10);

    localStorage.setItem(
      "recentlyPlayed",
      JSON.stringify(updatedPlayedSongs)
    );
  };

  const handlePlay = () => {
    // Ensure all necessary details are passed to onPlay
    onPlay(url, title, artist, thumbnail);
    addToRecentlyPlayed();
  };

  // Dynamically create the class string for the favorite button
  const favoriteButtonClass = `song-card-favorite-button ${
    isFavorite ? 'is-favorite' : 'not-favorite'
  }`;

  return (
    // Use specific class names defined in SongCard.css
    <div
      className="song-card"
      onClick={handlePlay}
      role="button" // Improve accessibility
      tabIndex={0} // Make it focusable
      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePlay(); }} // Keyboard accessibility
    >
      <div className="song-card-thumbnail-container">
         <img
           src={thumbnail}
           alt={title} // Keep descriptive alt text
           className="song-card-thumbnail"
           loading="lazy" // Add lazy loading for images
         />
      </div>


      <div className="song-card-info">
        <h3 className="song-card-title">
          {title}
        </h3>
        <p className="song-card-artist">{artist}</p>
      </div>

      {/* Use the dynamic class and pass event to toggleFavorite */}
      <button
        onClick={toggleFavorite} // Pass the event object
        className={favoriteButtonClass}
      >
        {isFavorite ? "❤️ Unfavorite" : "🤍 Favorite"}
      </button>
    </div>
  );
};

export default SongCard;