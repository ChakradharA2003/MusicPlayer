import React, { useState, useEffect } from "react";

const SongCard = ({ id, title, artist, thumbnail, onPlay, url }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the song is in favorites when the component loads
  useEffect(() => {
    checkIfFavorite();
  }, [id]);

  // Check if the song is already in the favorites list
  const checkIfFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isSongFavorite = savedFavorites.some((song) => song.id === id);
    setIsFavorite(isSongFavorite);
  };

  // Add/remove the song from favorites
  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      // If already in favorites, remove the song
      updatedFavorites = savedFavorites.filter((song) => song.id !== id);
    } else {
      // If not in favorites, add the song
      updatedFavorites = [
        ...savedFavorites,
        { id, title, artist, thumbnail, url },
      ];
    }

    // Save updated list to localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  // Add to recently played list
  const addToRecentlyPlayed = () => {
    const playedSongs =
      JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    const updatedPlayedSongs = [
      { id, title, artist, thumbnail, url },
      ...playedSongs.filter((song) => song.id !== id), // Avoid duplicates
    ].slice(0, 10); // Limit to 10 recent songs

    // Save updated list to localStorage
    localStorage.setItem(
      "recentlyPlayed",
      JSON.stringify(updatedPlayedSongs)
    );
  };

  // Handle play and add to recently played
  const handlePlay = () => {
    onPlay(url, title, artist, thumbnail);
    addToRecentlyPlayed();
  };

  return (
    <div
      className="bg-spotifyGray p-3 rounded-lg hover:bg-spotifyBlack cursor-pointer transition transform hover:scale-105 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
      onClick={handlePlay}
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 sm:h-44 md:h-48 lg:h-56 rounded-lg object-cover"
      />

      {/* Song Title */}
      <h3 className="text-white font-bold mt-2 text-sm md:text-base lg:text-lg truncate">
        {title}
      </h3>

      {/* Artist Name */}
      <p className="text-gray-400 text-xs md:text-sm truncate">{artist}</p>

      {/* Like/Unlike Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent onClick when button is clicked
          toggleFavorite(); // Call function to add/remove favorite
        }}
        className={`mt-2 text-xs px-3 py-1 rounded-md transition ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-500 text-white"
        }`}
      >
        {isFavorite ? "❤️ Unfavorite" : "🤍 Favorite"}
      </button>
    </div>
  );
};

export default SongCard;

