import BlastImage from "./BlastImage";
import Countdown from "./Countdown";
import InviteTitle from "./InviteTitle";

const SubSectionCountdown = () => {
  return (
    <div class="fourth-section">
      <div class="counter-text">
        <InviteTitle main="Aparta la Fecha" background="Save the Date" />
        <div class="counter">
          <Countdown />
        </div>
      </div>

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
