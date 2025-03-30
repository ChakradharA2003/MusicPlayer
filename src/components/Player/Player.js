import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import './Player.css'; // Import the CSS

const Player = ({ url, isPlaying, onPause, onPlay, thumbnail, title, artist }) => {
  const playerRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0); // Store song duration
  const [volume, setVolume] = useState(0.8); // Default volume

  useEffect(() => {
    const progressBar = document.querySelector('.player-progress-bar');
    if (progressBar) {
      progressBar.style.setProperty('--value', played);
    }
    const volumeSlider = document.querySelector('.player-volume-slider');
    if (volumeSlider) {
       volumeSlider.style.setProperty('--value', volume);
    }
  }, [played, volume]);

  // Handle progress update
  const handleProgress = (progress) => {
    setPlayed(progress.played); // played is a fraction (0 to 1)
  };

  // Get duration
  const handleDuration = (duration) => {
    setDuration(duration); // duration is in seconds
  };

  // Seek the audio based on progress bar
  const handleSeek = (e) => {
    const newPlayedFraction = parseFloat(e.target.value);
    setPlayed(newPlayedFraction);
    playerRef.current.seekTo(newPlayedFraction);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  // Format time (helper function)
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) return '0:00';
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = String(date.getUTCSeconds()).padStart(2, '0');
    if (hh) {
      return `${hh}:${String(mm).padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const playedSeconds = duration * played;

  return (
    // Use class names defined in Player.css
    <div className="player-container">
      {/* Left Section: Song Info */}
      <div className="player-song-info">
        {thumbnail && (
          <img src={thumbnail} alt={title || 'No song selected'} className="player-thumbnail" />
        )}
        <div className="player-text-info">
          <h3 className="player-title">{title || "Select a song"}</h3>
          <p className="player-artist">{artist || ""}</p>
        </div>
      </div>

      {/* Center Section: Controls & Progress */}
      <div className="player-controls-progress">
          {url ? (
           <>
            {/* Play/Pause Button (Central Control) */}
             <button
               onClick={isPlaying ? onPause : onPlay}
               className="player-play-button"
               aria-label={isPlaying ? "Pause" : "Play"}
             >
               {/* Replace with actual SVG icons for better styling if possible */}
               {isPlaying ? "❚❚" : "►"}
             </button>

             {/* Progress Bar */}
             <div className="player-progress-bar-container">
                <span className="player-time">{formatTime(playedSeconds)}</span>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step="any" // Allow finer control
                    value={played}
                    onChange={handleSeek}
                    className="player-progress-bar"
                    aria-label="Song progress"
                />
                <span className="player-time">{formatTime(duration)}</span>
             </div>
           </>
         ) : (
            <p className="player-placeholder-text">Select a song to play...</p>
         )}
      </div>


      {/* Right Section: Volume Control */}
       {url && (
          <div className="player-volume-section">
            {/* Add Volume Icon here if desired */}
            <input
              type="range"
              min={0}
              max={1}
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="player-volume-slider"
              aria-label="Volume control"
            />
          </div>
       )}


      {/* Hidden Audio Player */}
      <div className="player-hidden-reactplayer">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={isPlaying}
          volume={volume}
          onPlay={onPlay}
          onPause={onPause}
          onProgress={handleProgress}
          onDuration={handleDuration}
          height="0"
          width="0"
          config={{
            file: {
              attributes: {
                controlsList: "nodownload", // Keep download prevention
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Player;