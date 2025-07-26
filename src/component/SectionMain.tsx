import BlastImage from "./BlastImage";

import SubSectionCover from "./SubSectionCover";
import SubSectionIntro from "./SubSectionIntro";
import SubSectionCountdown from "./SubSectionCountdown";
import SubSectionEvents from "./SubSectionEvents";
import SubSectionTimeline from "./SubSectionTimeline";
import SubSectionImportantInfo from "./SubSectionImportantInfo";
import SubSectionAccommodations from "./SubSectionAccommodations";
import SubSectionGifts from "./SubSectionGifts";
import SubSectionExtendedTrip from "./SubSectionExtendedTrip";
import SubSectionGallery from "./SubSectionGallery";
import SubSectionRSVP from "./SubSectionRSVP";

type SectionMainProps = {
  isTop: boolean;
  handleSealClick: any;
};

const SectionMain = ({ isTop, handleSealClick }: SectionMainProps) => {
  return (
    <section class={`main ${isTop ? "top" : ""}`}>
      <SubSectionCover />
      <SubSectionIntro />
      <SubSectionCountdown />
      <SubSectionEvents />
      <SubSectionImportantInfo />
      <SubSectionTimeline />
      <SubSectionGallery />
      <SubSectionAccommodations />
      <SubSectionGifts />
      <SubSectionExtendedTrip />
      <SubSectionRSVP />
    </section>
  );
};

export default SectionMain;
