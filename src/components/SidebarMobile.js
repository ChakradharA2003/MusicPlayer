// SidebarMobile.js
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const SidebarMobile = ({ setActivePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="md:hidden relative">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="text-white text-2xl focus:outline-none"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu Options (Styled Like Spotify) */}
      {menuOpen && (
        <div className="absolute top-12 right-0 w-48 bg-spotifyGray z-50 p-3 space-y-2 text-white shadow-lg rounded-lg border border-gray-700">
          <div
            className="cursor-pointer hover:bg-spotifyGreen p-2 rounded-lg transition duration-200"
            onClick={() => {
              setActivePage("home");
              setMenuOpen(false);
            }}
          >
            🏠 Home
          </div>
          <div
            className="cursor-pointer hover:bg-spotifyGreen p-2 rounded-lg transition duration-200"
            onClick={() => {
              setActivePage("favorites");
              setMenuOpen(false);
            }}
          >
            ❤️ Favorites
          </div>
          <div
            className="cursor-pointer hover:bg-spotifyGreen p-2 rounded-lg transition duration-200"
            onClick={() => {
              setActivePage("recentlyPlayed");
              setMenuOpen(false);
            }}
          >
            🎧 Recently Played
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarMobile;
