// src/components/MusicPlayer.tsx
import { useEffect, useRef, useState } from "preact/hooks";
import melody from "../assets/music/melody.mp3";
import "./scss/MusicPlayer.scss";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowMessage(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  const shouldHide = isPlaying || (!isPlaying && !showMessage);

  return (
    <div class="music-player-container">
      <audio ref={audioRef} src={melody} loop preload="metadata" playsinline />

      <div class={`music-inline-wrapper ${shouldHide ? "hide-message" : ""}`}>
        <button
          onClick={togglePlay}
          class={`music-button ${isPlaying ? "playing" : ""}`}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          <svg
            viewBox="0 0 24 24"
            class="music-icon"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isPlaying ? (
              <>
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </>
            ) : (
              <polygon points="6,4 20,12 6,20" />
            )}
          </svg>
        </button>
        <span class="music-message">
          Haz clic para escuchar nuestra melodía
        </span>
      </div>
    </div>
  );
};

export default MusicPlayer;
