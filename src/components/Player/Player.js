import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import './Player.css'; // Import the CSS
import { IoMdSkipForward } from "react-icons/io"
import { FaPause } from "react-icons/fa6"
import { FaPlay } from "react-icons/fa"
import { IoMdSkipBackward } from "react-icons/io"

const Player = ({ url, isPlaying, onPause, onPlay, thumbnail, title, artist }) => {
    const playerRef = useRef(null);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0); // Store song duration
    const [volume, setVolume] = useState(0.8); // Default volume
    const [playHistory, setPlayHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentSongData, setCurrentSongData] = useState({ url, thumbnail, title, artist });

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

    useEffect(() => {
        setCurrentSongData({ url, thumbnail, title, artist });
        // When a new song starts, add it to history if it's not a history navigation
        if (url && (playHistory.length === 0 || playHistory[playHistory.length - 1]?.url !== url) && historyIndex === playHistory.length - 1) {
            setPlayHistory(prev => [...prev, { url, thumbnail, title, artist }]);
            setHistoryIndex(prev => prev + 1);
        }
    }, [url, thumbnail, title, artist]);

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

    const handleRewind = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            const prevSong = playHistory[historyIndex - 1];
            setCurrentSongData(prevSong);
            if (prevSong.url) {
                onPlay();
            }
        } else {
            playerRef.current.seekTo(0); // Go to the beginning of the current song
        }
    };

    const handleForward = () => {
        if (historyIndex < playHistory.length - 1) {
            setHistoryIndex(prev => prev + 1);
            const nextSong = playHistory[historyIndex + 1];
            setCurrentSongData(nextSong);
            if (nextSong.url) {
                onPlay();
            }
        } else {
            // Try to play from recently played songs in local storage
            const recentlyPlayed = localStorage.getItem('recentlyPlayed');
            if (recentlyPlayed) {
                const parsedRecentlyPlayed = JSON.parse(recentlyPlayed);
                if (parsedRecentlyPlayed && parsedRecentlyPlayed.length > 0) {
                    // For simplicity, let's play the most recent one that's not currently playing
                    const nextRecentSong = parsedRecentlyPlayed.find(song => song.url !== currentSongData.url);
                    if (nextRecentSong) {
                        setCurrentSongData(nextRecentSong);
                        onPlay(nextRecentSong.url); // You might need to adjust 'onPlay' to accept a URL
                        // Optionally, add this to the play history
                        setPlayHistory(prev => [...prev, nextRecentSong]);
                        setHistoryIndex(prev => prev + 1);
                        return;
                    }
                }
            }
            console.log("End of history and no recently played songs available.");
            // Optionally provide visual feedback to the user
        }
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
                {currentSongData.thumbnail && (
                    <img src={currentSongData.thumbnail} alt={currentSongData.title || 'No song selected'} className="player-thumbnail" />
                )}
                <div className="player-text-info">
                    <h3 className="player-title">{currentSongData.title || "Select a song"}</h3>
                    <p className="player-artist">{currentSongData.artist || ""}</p>
                </div>
            </div>

            {/* Center Section: Controls & Progress */}
            <div className="player-controls-progress">
                <div className="player-controls">
                    <button onClick={handleRewind} className="player-control-button" aria-label="Previous track">
                        {/* Rewind Icon */}
                        <IoMdSkipBackward />
                    </button>
                    <button
                        onClick={isPlaying ? onPause : onPlay}
                        className="player-play-button"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <FaPause />
                        ) : (
                          <FaPlay />
                        )}
                    </button>
                    <button onClick={handleForward} className="player-control-button" aria-label="Next track">
                        {/* Forward Icon */}
                        <IoMdSkipForward />
                    </button>
                </div>

                {currentSongData.url ? (
                    <div className="player-progress-bar-container">
                        <span className="player-time">{formatTime(playedSeconds)}</span>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={played}
                            onChange={handleSeek}
                            className="player-progress-bar"
                            aria-label="Song progress"
                        />
                        <span className="player-time">{formatTime(duration)}</span>
                    </div>
                ) : (
                    <p className="player-placeholder-text">Select a song to play...</p>
                )}
            </div>

            {/* Right Section: Volume Control */}
            {currentSongData.url && (
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
                    url={currentSongData.url}
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