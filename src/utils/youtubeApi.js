// youtubeApi.js
const API_KEY = "AIzaSyCdX074Gd6WdxSgB5QoCdwhm0pNMBLcCBc";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Fetch trending songs from YouTube API
export const fetchTrendingSongs = async () => {
  const response = await fetch(
    `${BASE_URL}/videos?part=snippet&chart=mostPopular&videoCategoryId=10&regionCode=IN&maxResults=12&key=${API_KEY}`
  );
  const data = await response.json();
  return data.items.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.high.url,
  }));
};

// Search songs from YouTube API
export const searchSongs = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&maxResults=12&q=${query}&videoCategoryId=10&key=${API_KEY}`
  );
  const data = await response.json();
  return data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.high.url,
  }));
};
