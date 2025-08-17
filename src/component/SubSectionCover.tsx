import BlastImage from "./BlastImage";
import InviteTitle from "./InviteTitle";

const SubSectionCover = () => {
  return (
    <>
      <div class="first-section">
        <BlastImage
          img="COVER"
          className="cover-image"
          alt="Nos Casamos - Image"
          fetchpriority="high"
        />

        <header
          class="cover-names"
          role="banner"
          aria-label="Portada - nombres"
        >
          <p class="cover-names__subtitle">Nuestra Boda</p>

          <h1 class="cover-names__couple" aria-hidden="false">
            <span class="cover-names__word">SOFÍA</span>
            <span class="cover-names__sep">&</span>
            <span class="cover-names__word">CRISTHIAN</span>
          </h1>

          <p data-animate="in-place" class="cover-names__date">
            27. 02. 2026
          </p>
        </header>

        <p data-animate="in-place" class="first-section__place">
          Inírida - Guainía
        </p>
      </div>

      <InviteTitle
        data-animate="in-place"
        className="nos-casamos"
        main="¡Nos Casamos!"
        background="Nos Casamos"
      />
    </>
  );
};

export default SubSectionCover;
