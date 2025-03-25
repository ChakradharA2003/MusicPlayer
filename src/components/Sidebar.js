import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({ setActivePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="md:mt-16 md:w-64 bg-spotifyGray h-screen md:block hidden">
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

      {/* Mobile View - Hamburger */}
      <div className="md:hidden bg-spotifyGray p-4 text-white">
        <button onClick={toggleMenu} className="text-white text-2xl">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Options */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-spotifyGray z-10 p-4 space-y-4 text-white">
          <li
            className="cursor-pointer hover:text-spotifyGreen"
            onClick={() => {
              setActivePage("home");
              setMenuOpen(false);
            }}
          >
            Home
          </li>
          
          <li
            className="cursor-pointer hover:text-spotifyGreen"
            onClick={() => {
              setActivePage("favorites");
              setMenuOpen(false);
            }}
          >
            ❤️ Favorites
          </li>
          <li
            className="cursor-pointer hover:text-spotifyGreen"
            onClick={() => {
              setActivePage("recentlyPlayed");
              setMenuOpen(false);
            }}
          >
            🎧 Recently Played
          </li>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
