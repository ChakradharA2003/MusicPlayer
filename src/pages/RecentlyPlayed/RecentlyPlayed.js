// import React, { useState, useEffect } from "react";
// import SongCard from "../../components/SongCard";

// const RecentlyPlayed = ({ onPlay }) => {
//   const [recentlyPlayed, setRecentlyPlayed] = useState([]);

//   // Load recently played songs from localStorage
//   useEffect(() => {
//     const playedSongs =
//       JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
//     setRecentlyPlayed(playedSongs);
//   }, []);

//   return (
//     <div className="md:mt-12 p-6 text-white">
//       <h2 className="text-3xl font-bold mb-4">🎧 Recently Played</h2>
//       {recentlyPlayed.length === 0 ? (
//         <p>No songs played recently!</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {recentlyPlayed.map((song, index) => (
//             <SongCard
//               key={index}
//               id={song.id}
//               title={song.title}
//               artist={song.artist}
//               thumbnail={song.thumbnail}
//               onPlay={() =>
//                 onPlay(song.url, song.title, song.artist, song.thumbnail)
//               }
//               url={song.url}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecentlyPlayed;


// RecentlyPlayed.js
import React, { useState, useEffect } from "react";
import SongCard from "../../components/SongCard";

const RecentlyPlayed = ({ onPlay }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Load recently played songs from localStorage
  useEffect(() => {
    const playedSongs =
      JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    setRecentlyPlayed(playedSongs);
  }, []);

  return (
    <div className="p-4 mt-20 md:mt-1 lg:mt-1 text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">🎧 Recently Played</h2>
      {recentlyPlayed.length === 0 ? (
        <p className="text-gray-400">No songs played recently!</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {recentlyPlayed.map((song, index) => (
            <SongCard
              key={index}
              id={song.id}
              title={song.title}
              artist={song.artist}
              thumbnail={song.thumbnail}
              onPlay={() =>
                onPlay(song.url, song.title, song.artist, song.thumbnail)
              }
              url={song.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyPlayed;
