import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";

const Player = ({ url, isPlaying, onPause, onPlay, thumbnail, title, artist }) => {
  const playerRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.8); // Default volume

  // Handle progress update
  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  // Seek the audio based on progress bar
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setPlayed(newTime);
    playerRef.current.seekTo(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-spotifyGray p-4 flex items-center space-x-4 text-white">
      {/* Thumbnail and Song Info */}
      {thumbnail && (
        <img src={thumbnail} alt={title} className="w-16 h-16 rounded-lg" />
      )}
      <div className="flex-1">
        <h3 className="text-lg font-bold">{title || "Select a song"}</h3>
        <p className="text-sm text-gray-400">{artist || ""}</p>
      </div>

      {/* Audio Controls */}
      {url ? (
        <div className="flex items-center space-x-4">
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="bg-spotifyGreen px-4 py-2 rounded-md"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          {/* Progress Bar */}
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={played}
            onChange={handleSeek}
            className="w-32"
          />

          {/* Volume Control */}
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      ) : (
        <p className="text-white">Select a song to play...</p>
      )}

      {/* Hidden Audio Player */}
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        volume={volume}
        onPlay={onPlay}
        onPause={onPause}
        onProgress={handleProgress}
        height={0} // Hide video completely
        width={0}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
    </div>
  );
};

export default Player;

