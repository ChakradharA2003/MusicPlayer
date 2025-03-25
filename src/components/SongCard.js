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
    console.log(savedFavorites);
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

    // ✅ Corrected: Save updated list to localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite); // Toggle favorite status
  };

  // Add to recently played list
  const addToRecentlyPlayed = () => {
    const playedSongs =
      JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    const updatedPlayedSongs = [
      { id, title, artist, thumbnail, url },
      ...playedSongs.filter((song) => song.id !== id), // Avoid duplicates
    ].slice(0, 10); // Limit to 10 recent songs

    // ✅ Corrected: Save updated list to localStorage
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
      className="bg-spotifyGray p-3 rounded-lg hover:bg-spotifyBlack cursor-pointer transition transform hover:scale-105"
      onClick={handlePlay}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 md:h-48 lg:h-56 rounded-lg object-cover"
      />
      <h3 className="text-white font-bold mt-2 text-sm md:text-base lg:text-lg">
        {title}
      </h3>
      <p className="text-gray-400 text-xs md:text-sm">{artist}</p>

      {/* Like/Unlike Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent onClick when button is clicked
          toggleFavorite(); // Call function to add/remove favorite
        }}
        className={`mt-2 text-xs px-2 py-1 rounded ${
          isFavorite ? "bg-red-500" : "bg-gray-500"
        }`}
      >
        {isFavorite ? "❤️ Unfavorite" : "🤍 Favorite"}
      </button>
    </div>
  );
};

export default SongCard;
