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
        <p data-animate="in-place" class="first-section__date">
          27. 02. 2026
        </p>
      </h1>
      <p data-animate="in-place" class="first-section__place">
        Inírida - Guanía
      </p>
    </div>
  );
};

export default SubSectionCover;
