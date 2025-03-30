// SidebarMobile.js
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Keep using icons
import './SidebarMobile.css'; // Import the CSS

const SidebarMobile = ({ setActivePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigation = (page) => {
    setActivePage(page);
    setMenuOpen(false); // Close menu after selection
  };

  return (
    // Use class names defined in SidebarMobile.css
    <div className="sidebar-mobile-container">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="sidebar-mobile-toggle-button"
        aria-label={menuOpen ? "Close menu" : "Open menu"} // Accessibility
        aria-expanded={menuOpen} // Accessibility
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />} {/* Adjust icon size if needed */}
      </button>

      {/* Mobile Menu Options */}
      {menuOpen && (
        <nav
          className="sidebar-mobile-menu"
          role="menu" // Accessibility for menu role
        >
          <div
            className="sidebar-mobile-menu-item"
            onClick={() => handleNavigation("home")}
            role="menuitem" // Accessibility
            tabIndex={0} // Focusable
             onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavigation("home"); }}
          >
            🏠 Home
          </div>
          <div
            className="sidebar-mobile-menu-item"
            onClick={() => handleNavigation("favorites")}
            role="menuitem"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavigation("favorites"); }}
          >
            ❤️ Favorites
          </div>
          <div
            className="sidebar-mobile-menu-item"
            onClick={() => handleNavigation("recentlyPlayed")}
            role="menuitem"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavigation("recentlyPlayed"); }}
          >
            🎧 Recently Played
          </div>
        </nav>
      )}
    </div>
  );
};

export default SidebarMobile;