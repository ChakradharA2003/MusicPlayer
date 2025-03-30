import React, { useState, useEffect } from "react";
import SongCard from "../../components/SongCard/SongCard"; // Assuming SongCard is updated
import './RecentlyPlayed.css'; // Import the CSS

const RecentlyPlayed = ({ onPlay }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Load recently played songs from localStorage
  useEffect(() => {
    const loadRecentlyPlayed = () => {
        const playedSongs = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
        setRecentlyPlayed(playedSongs);
    };

    loadRecentlyPlayed();

     // Optional: Add event listener to update if recently played changes
     const handleStorageChange = (event) => {
        if (event.key === 'recentlyPlayed') {
            loadRecentlyPlayed();
        }
    };
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };

  }, []); // Run only once on mount

  return (
    // Use class names defined in RecentlyPlayed.css (similar to Home.css)
    <div className="recently-played-page-container">
      <h2 className="page-title">🎧 Recently Played</h2>
      {recentlyPlayed.length === 0 ? (
        <p className="empty-message">No songs played recently!</p>
      ) : (
         // Use the same grid layout as Home
        <div className="song-grid-container">
          {recentlyPlayed.map((song, index) => (
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

export default RecentlyPlayed;