import BlastImage from "./BlastImage";
import { Handwritten } from "./Handwritten";

const FALLBACK_TEXT = "Familia Moreno Cruz";
const FALLBACK_RESERVED = 1;

type SectionEnvelopeProps = {
  isTop: boolean;
  data: any;
  handleSealClick: any;
};

const SectionEnvelope = ({
  isTop,
  data,
  handleSealClick,
}: SectionEnvelopeProps) => {
  return (
    <section class={`loader ${isTop ? "hidden" : ""}`}>
      <div class="loader__texture"></div>
      <div class="loader__texture-second"></div>
      <div class="loader__light"></div>
      <div class="loader__container">
        <div class="container-triangle"></div>
        <Handwritten
          text={data?.text || FALLBACK_TEXT}
          fontSize={100}
          letterDelay={0.22}
        />
      </div>
      <div class="seal">
        <div class="seal__triangle"></div>
        <a href="#" class="circular-text">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </defs>
            <text font-size="currentFontSize" fill="currentColor">
              <textPath href="#circlePath" startOffset="0">
                Click Aquí - Click Aquí
              </textPath>
            </text>
          </svg>
        </a>
        <BlastImage
          img="the_invite_seal_sc"
          className="seal-image"
          alt="The Invite Seal - S&C"
          fetchpriority="high"
          onClick={handleSealClick}
        />
      </div>
      <div class="double_border"></div>
      <div class="deep_border"></div>
      <div class="card-reserved">
        <p>
          Hemos reservado {data?.reserved || FALLBACK_RESERVED} lugar(es){" "}
          {data?.baby ? " + bebé" : ""} en su honor.
        </p>
      </div>
    </section>
  );
};

export default SectionEnvelope;
