// SidebarDesktop.js
import React from "react";

const SidebarDesktop = ({ setActivePage }) => {
  return (
    <div className="md:mt-3 hidden md:flex flex-col w-64 bg-spotifyGray h-screen fixed top-16 left-0">
      <ul className="space-y-4 p-4 text-white">
        <li
          className="cursor-pointer hover:text-spotifyGreen flex"
          onClick={() => setActivePage("home")}
        >
          🏠 Home
        </li>
        <li
          className="cursor-pointer hover:text-spotifyGreen"
          onClick={() => setActivePage("favorites")}
        >
          ❤️ Favorites
        </li>
        <li
          className="cursor-pointer hover:text-spotifyGreen"
          onClick={() => setActivePage("recentlyPlayed")}
        >
          🎧 Recently Played
        </li>
      </ul>
    </div>
  );
};

export default SidebarDesktop;
