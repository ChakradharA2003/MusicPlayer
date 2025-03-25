// import React, { useState } from "react";
// import { searchSongs } from "../utils/youtubeApi"; // Import YouTube API function

// const Navbar = ({ setSearchResults }) => {
//   const [query, setQuery] = useState("");

//   // Handle search and fetch results from YouTube API
//   const handleSearch = async () => {
//     if (query.trim() === "") {
//       setSearchResults([]); // Show trending if search is cleared
//     } else {
//       const results = await searchSongs(query);
//       setSearchResults(results);
//     }
//   };

//   return (
//     <div className="bg-spotifyBlack text-white fixed top-0 left-0 w-full p-3 md:p-4 shadow-md z-50">
//       {/* Navbar Flex Container */}
//       <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
//         {/* App Name / Heading */}
//         <h1 className="text-lg md:text-2xl font-bold">🎧 Music Player</h1>

//         {/* Search Section (Always Inline) */}
//         <div className="flex items-center space-x-2 w-full md:w-auto">
//           {/* Search Input */}
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => {
//               setQuery(e.target.value);
//               if (e.target.value === "") {
//                 setSearchResults([]); // Show trending when empty
//               }
//             }}
//             placeholder="Search for songs..."
//             className="bg-spotifyGray p-2 rounded-md outline-none w-full md:w-64 text-white"
//           />
//           {/* Search Button */}
//           <button
//             onClick={handleSearch}
//             className="bg-spotifyGreen text-white px-4 py-2 rounded-md hover:bg-green-600 w-auto"
//           >
//             Search
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// Navbar.js
import React, { useState } from "react";
import { searchSongs } from "../../utils/youtubeApi";
import SidebarMobile from "../SidebarMobile"; // Import SidebarMobile
import './Navbar.css'

const Navbar = ({ setSearchResults, setActivePage }) => {
  const [query, setQuery] = useState("");

  // Handle search and fetch results from YouTube API
  const handleSearch = async () => {
    if (query.trim() === "") {
      setSearchResults([]); // Show trending if search is cleared
    } else {
      const results = await searchSongs(query);
      setSearchResults(results);
    }
  };

  return (
    <div className="bg-spotifyBlack text-white fixed top-0 left-0 p-3 md:p-4 shadow-md z-50">
      {/* Navbar Flex Container */}
      <div className="custom-class flex items-center justify-between">
        {/* App Name / Heading */}
        <div className="custom-class-two">
          <h1 className="text-lg md:text-2xl font-bold">🎧 Music Player</h1>
          {/* Mobile Hamburger Menu (Sidebar Inside Navbar) */}
          <div className="md:hidden">
            <SidebarMobile setActivePage={setActivePage} />
          </div>
        </div>


        {/* Search Section */}
        <div className="custom-field-input-container flex items-center mt-3 custom-input-field-container">
          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs..."
            className="bg-spotifyGray p-2 rounded-md outline-none w-full md:w-64 text-white"
          />
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-spotifyGreen text-white px-4 py-2 rounded-md hover:bg-green-600 w-auto"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
