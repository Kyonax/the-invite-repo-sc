import BlastImage from "./BlastImage";
import InviteTitle from "./InviteTitle";

const SubSectionCover = () => {
  return (
    <div class="first-section">
      <BlastImage
        img="COVER"
        className="cover-image"
        alt="Nos Casamos - Image"
        fetchpriority="high"
      />
      <h1 class="cover-names">
        <InviteTitle main="Nuestra Boda" background="Sofía y Cristhian" />
      </h1>
    </div>
  );
};

export default SubSectionCover;
