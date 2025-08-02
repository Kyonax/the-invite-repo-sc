import SvgProgress from "./SvgProgress";

type PreloaderProps = {
  progress: number;
  dotPosition: number;
};

const Preloader = ({ progress, dotPosition }: PreloaderProps) => {
  return (
    <div class="preloader-screen">
      <div class="preloader-animation">
        <div class="loading-bar">
          <div
            class="progress-fill"
            style={{ width: `${progress.toFixed(1)}%` }}
          >
            <SvgProgress dotPosition={dotPosition} />
          </div>
        </div>
      </div>
      <p>Preparando tu invitación... {progress}%</p>
    </div>
  );
};

export default Preloader;
