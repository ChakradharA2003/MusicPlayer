
const API_KEY = "AIzaSyCdX074Gd6WdxSgB5QoCdwhm0pNMBLcCBc"; 
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Helper function to extract necessary data
const formatSongData = (item) => {
    // Ensure item.snippet exists and has properties
    const snippet = item.snippet || {};
    const thumbnails = snippet.thumbnails || {};
    const defaultThumbnail = thumbnails.default || {}; // Fallback

    // Determine best available thumbnail quality
    const thumbnailUrl = thumbnails.high?.url || thumbnails.medium?.url || defaultThumbnail.url || ''; // Add default empty string

     // Check if item.id is an object (search results) or string (videos results)
     const videoId = typeof item.id === 'object' ? item.id.videoId : item.id;

    return {
      // Use videoId for the id field
      id: videoId,
      title: snippet.title || "Unknown Title", // Add fallback
      artist: snippet.channelTitle || "Unknown Artist", // Use channelTitle as artist
      thumbnail: thumbnailUrl,
      url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : '' // Add check for videoId
    };
};

// Search for songs
export const searchSongs = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&key=${API_KEY}&maxResults=20` // Fetch more results if needed
    );
    if (!response.ok) {
      // More specific error handling
      const errorData = await response.json();
      console.error("YouTube API Error (Search):", errorData);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error?.message || 'Unknown error'}`);
    }
    const data = await response.json();
    // Filter out potential undefined items or items without an id after formatting
    return data.items ? data.items.map(formatSongData).filter(song => song && song.id) : [];
  } catch (error) {
    console.error("Error searching songs:", error);
    return []; // Return empty array on error
  }
};

// Fetch trending music videos
export const fetchTrendingSongs = async () => {
  try {
    // Fetch most popular music videos in a specific region (e.g., US)
    // Adjust regionCode as needed (e.g., 'IN' for India)
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails&chart=mostPopular&videoCategoryId=10&regionCode=IN&key=${API_KEY}&maxResults=20` // Fetch more results if needed
    );
     if (!response.ok) {
        const errorData = await response.json();
        console.error("YouTube API Error (Trending):", errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error?.message || 'Unknown error'}`);
      }
    const data = await response.json();
     // Filter out potential undefined items or items without an id after formatting
    return data.items ? data.items.map(formatSongData).filter(song => song && song.id) : [];
  } catch (error) {
    console.error("Error fetching trending songs:", error);
    return []; // Return empty array on error
  }
};