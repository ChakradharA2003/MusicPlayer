import React, { useEffect, useState } from "react";
import SongCard from "../../components/SongCard/SongCard"; // Assuming SongCard is updated
import { fetchTrendingSongs } from "../../utils/YoutubeApi";
import './Home.css'; // Import the CSS

const Home = ({ searchResults, onPlay }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const loadSongs = async () => {
      if (searchResults && searchResults.length > 0) {
        setSongs(searchResults);
      } else {
        // Only fetch trending if search results are explicitly empty (not just initially)
        // This check might need adjustment based on how searchResults are cleared/set.
        const trendingSongs = await fetchTrendingSongs();
        setSongs(trendingSongs);
      }
    };

    loadSongs();
  }, [searchResults]); // Dependency array ensures this runs when searchResults change

  const pageTitle = searchResults.length === 0 ? "🔥 Trending Songs" : "🔎 Search Results";

  return (
    // Use class names defined in Home.css
    <div className="home-page-container">
      <h2 className="page-title">{pageTitle}</h2>
      {songs.length > 0 ? (
        // Use a grid layout for the songs
        <div className="song-grid-container">
          {songs.map((song) => (
            <SongCard
              key={song.id} // Use unique ID from API as key
              id={song.id}
              title={song.title}
              artist={song.artist}
              thumbnail={song.thumbnail}
              url={`https://www.youtube.com/watch?v=${song.id}`} // Example direct YouTube link (may not work in ReactPlayer directly without adjustments)
              onPlay={onPlay} // Pass the onPlay function directly
            />
          ))}
        </div>
      ) : (
          <p className="loading-message">Loading songs...</p>
      )}
    </div>
  );
};

export default Home;