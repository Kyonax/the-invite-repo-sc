import { useEffect, useRef, useState } from "preact/hooks";
import "./scss/MusicPlayer.scss";

const MusicPlayer = () => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [YTPlayer, setYTPlayer] = useState<any>(null);
  const [showMessage, setShowMessage] = useState(true); // Start visible on load

  useEffect(() => {
    const createPlayer = () => {
      const player = new window.YT.Player(playerRef.current, {
        height: "0",
        width: "0",
        videoId: "jIaFQNCqmBc",
        playerVars: {
          autoplay: 0,
          mute: 0,
          loop: 1,
          playlist: "jIaFQNCqmBc",
        },
        events: {
          onReady: (e) => setYTPlayer(e.target),
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    // Hide the initial message after 4 seconds
    const timeout = setTimeout(() => {
      setShowMessage(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const togglePlay = () => {
    if (!YTPlayer) return;

    if (isPlaying) {
      YTPlayer.pauseVideo();
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    } else {
      YTPlayer.unMute();
      YTPlayer.playVideo();
      setShowMessage(false);
    }

    setIsPlaying(!isPlaying);
  };

  const shouldHide = isPlaying || (!isPlaying && !showMessage);

  return (
    <div class="music-player-container">
      <div ref={playerRef} />
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
              <g>
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </g>
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
