import BlastImage from "./BlastImage";

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
        <span class="cover-wedding">Nuestra Boda</span> Sofia y Cristhian
      </h1>
    </div>
  );
};

export default SubSectionCover;
