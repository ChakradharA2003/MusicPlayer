// Navbar.js
import React, { useState } from "react";
import { searchSongs } from "../../utils/YoutubeApi";
import SidebarMobile from "../SidebarMobile/SidebarMobile"; // Assuming SidebarMobile will also be updated
import './Navbar.css'; // Import the CSS file

const Navbar = ({ setSearchResults, setActivePage }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const results = await searchSongs(query);
      setSearchResults(results);
    }
  };

  // Function to handle search input changes and clear results if empty
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() === "") {
      setSearchResults([]); // Clear results immediately when input is empty
    }
  };

  return (
    // Use specific class names defined in Navbar.css
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Left section: Title and Mobile Sidebar Toggle */}
        <div className="navbar-left-section">
          <h1 className="navbar-title">🎧 Music Player</h1>
          {/* Mobile Hamburger Menu */}
          <div className="navbar-mobile-sidebar">
            {/* Ensure SidebarMobile props and usage are consistent */}
            <SidebarMobile setActivePage={setActivePage} />
          </div>
        </div>

        {/* Right section: Search */}
        <div className="navbar-search-section">
          <input
            type="text"
            value={query}
            onChange={handleInputChange} // Use updated handler
            placeholder="Search for songs..."
            className="navbar-search-input"
          />
          <button
            onClick={handleSearch}
            className="navbar-search-button"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;