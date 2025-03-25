import React from "react";
import SongCard from "../../components/SongCard";

const SearchResults = ({ results }) => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">🔎 Search Results</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((song) => (
          <SongCard
            key={song.id}
            title={song.title}
            artist={song.artist}
            thumbnail={song.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
