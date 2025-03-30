// SidebarDesktop.js
import React from "react";
import './SidebarDesktop.css'; // Import the CSS

const SidebarDesktop = ({ setActivePage }) => {
  return (
    // Use class names defined in SidebarDesktop.css
    <nav className="sidebar-desktop-container">
      <ul className="sidebar-desktop-nav-list">
        <li
          className="sidebar-desktop-nav-item"
          onClick={() => setActivePage("home")}
          role="button" // Accessibility
          tabIndex={0} // Focusable
          onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') setActivePage("home"); }} // Keyboard navigation
        >
          🏠 Home
        </li>
        <li
          className="sidebar-desktop-nav-item"
          onClick={() => setActivePage("favorites")}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') setActivePage("favorites"); }}
        >
          ❤️ Favorites
        </li>
        <li
          className="sidebar-desktop-nav-item"
          onClick={() => setActivePage("recentlyPlayed")}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') setActivePage("recentlyPlayed"); }}
        >
          🎧 Recently Played
        </li>
        {/* Add more complex sections like 'Your Library' from the image here if needed in the future */}
      </ul>
    </nav>
  );
};

export default SidebarDesktop;