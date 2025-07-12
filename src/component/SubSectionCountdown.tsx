import BlastImage from "./BlastImage";
import Countdown from "./Countdown";

const SubSectionCountdown = () => {
  return (
    <div class="fourth-section">
      <h3 class="counter-text">
        <span class="counter-text__title">
          <span>Save the Date</span>Aparta la Fecha
        </span>
        <div class="counter">
          <Countdown />
        </div>
      </h3>
      <BlastImage
        img="IMG_TRANSITION_ONE"
        className="transition-image"
        alt="Nos Casamos - Transition Image"
        fetchpriority="high"
      />
    </div>
  );
};

export default SubSectionCountdown;
