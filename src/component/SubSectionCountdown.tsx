import BlastImage from "./BlastImage";
import Countdown from "./Countdown";
import InviteTitle from "./InviteTitle";

const SubSectionCountdown = () => {
  return (
    <div class="fourth-section">
      <div class="counter-text">
        <InviteTitle main="Aparta la Fecha" background="Save the Date" />
        <div data-animate="in-place" class="counter">
          <Countdown />
        </div>
      </div>

      <div class="image-section" data-animate="up">
        <BlastImage
          img="IMG_TRANSITION_ONE"
          className="transition-image"
          alt="Nos Casamos - Transition Image"
          fetchpriority="high"
        />
      </div>
    </div>
  );
};

export default SubSectionCountdown;
