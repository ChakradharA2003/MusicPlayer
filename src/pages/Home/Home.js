import React, { useEffect, useState } from "react";
import SongCard from "../../components/SongCard";
import { fetchTrendingSongs } from "../../utils/youtubeApi";

const Home = ({ searchResults, onPlay }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const loadTrendingSongs = async () => {
      if (searchResults && searchResults.length === 0) {
        const trendingSongs = await fetchTrendingSongs();
        setSongs(trendingSongs);
      } else {
        setSongs(searchResults);
      }
    };

    loadTrendingSongs();
  }, [searchResults]);

  return (
    <div className="p-6 md:mt-12 text-white">
      <h2 className="text-3xl font-bold mb-4">
        {searchResults.length === 0 ? "🔥 Trending Songs" : "🔎 Search Results"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            id={song.id}
            title={song.title}
            artist={song.artist}
            thumbnail={song.thumbnail}
            onPlay={() =>
              onPlay(
                `https://www.youtube.com/watch?v=${song.id}`,
                song.title,
                song.artist,
                song.thumbnail
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Home;